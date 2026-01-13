import { UserCircle2 } from 'lucide-react';

export const OrgCard = ({ name, title, role, image, highlight = false }: { name: string; title: string; role?: string; image?: string; highlight?: boolean }) => (
    <div className={`inline-flex flex-col items-center p-4 rounded-2xl border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group bg-white ${highlight
        ? 'border-[#153e70] ring-4 ring-blue-50/50'
        : 'border-slate-200 hover:border-blue-300'
        }`} style={{ minWidth: '180px' }}>

        {/* Avatar */}
        <div className={`w-14 h-14 rounded-full mb-3 flex items-center justify-center overflow-hidden border-2 ${highlight ? 'border-[#153e70] bg-blue-50' : 'border-slate-100 bg-slate-50'
            }`}>
            {image ? (
                <img src={image} alt={name} className="w-full h-full object-cover" />
            ) : (
                <UserCircle2 className={`w-10 h-10 ${highlight ? 'text-[#153e70]' : 'text-slate-300'}`} />
            )}
        </div>

        {/* Info */}
        <div className="text-center">
            <h4 className={`font-bold text-sm mb-1 ${highlight ? 'text-[#153e70]' : 'text-slate-800'}`}>
                {name}
            </h4>
            <div className={`text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full inline-block mb-1 ${highlight ? 'bg-[#153e70] text-white' : 'bg-slate-100 text-slate-500'
                }`}>
                {title}
            </div>
            {role && (
                <p className="text-[10px] text-slate-500 font-medium">{role}</p>
            )}
        </div>
    </div>
);
