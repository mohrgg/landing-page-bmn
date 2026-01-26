import { SignJWT, jwtVerify, type JWTPayload } from 'jose';

// JWT Secret dari environment variable - HARUS SAMA dengan Tabulasi Data BMN
const JWT_SECRET = process.env.JWT_SECRET || 'bmn-kemnaker-sso-secret-key-2026';

// Encode secret untuk jose
const getSecretKey = () => new TextEncoder().encode(JWT_SECRET);

// Interface untuk payload token
export interface TokenPayload extends JWTPayload {
  username: string;
  role: 'SATKER' | 'INTERNAL';
  name: string;
}

/**
 * Sign JWT token dengan jose (support Edge Runtime)
 * @param payload - Data yang akan disimpan dalam token
 * @param expiresIn - Durasi token (default: 24 jam)
 */
export async function signToken(
  payload: Omit<TokenPayload, 'iat' | 'exp'>,
  expiresIn: string = '24h'
): Promise<string> {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(getSecretKey());

  return token;
}

/**
 * Verify JWT token
 * @param token - Token yang akan diverifikasi
 */
export async function verifyToken(token: string): Promise<TokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    return payload as TokenPayload;
  } catch {
    return null;
  }
}

// Mock users untuk development
export const MOCK_USERS = [
  {
    username: 'satker01',
    password: '123',
    role: 'SATKER' as const,
    name: 'Satker Jakarta',
  },
  {
    username: 'admin',
    password: '123',
    role: 'INTERNAL' as const,
    name: 'Admin Pusat',
  },
];

/**
 * Authenticate user dengan mock data
 */
export function authenticateUser(username: string, password: string) {
  const user = MOCK_USERS.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    return null;
  }

  return {
    username: user.username,
    role: user.role,
    name: user.name,
  };
}
