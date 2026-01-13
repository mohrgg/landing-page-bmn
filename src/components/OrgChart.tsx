'use client';

import { Tree, TreeNode } from 'react-organizational-chart';
import { OrgCard } from './OrgCard';

export default function OrgChart() {
    return (
        <Tree
            lineWidth="2px"
            lineColor="#cbd5e1"
            lineBorderRadius="12px"
            label={
                <OrgCard
                    name="Dr. Cris Kuntadi, S.E., M.M."
                    title="Sekretaris Jenderal"
                    role="Pimpinan Unit Eselon I"
                    highlight={true}
                    image="https://picsum.photos/seed/sekjen/200"
                />
            }
        >
            {/* Level 2 Nodes - Biro Keuangan & BMN */}
            <TreeNode label={
                <OrgCard
                    name="Drs. Helmiaty Basri, M.Si"
                    title="Kepala Biro"
                    role="Biro Keuangan & BMN"
                    image="https://picsum.photos/seed/biro1/200"
                />
            }>
                <TreeNode label={
                    <OrgCard
                        name="Asep Kurnia, S.E."
                        title="Koordinator"
                        role="Bagian Anggaran"
                    />
                } />
                <TreeNode label={
                    <OrgCard
                        name="Rini Setiawati, S.Sos"
                        title="Koordinator"
                        role="Bagian Perbendaharaan"
                    />
                } />
                <TreeNode label={
                    <OrgCard
                        name="Budi Santoso, S.Kom"
                        title="Koordinator"
                        role="Bagian Akuntansi (BMN)"
                    />
                } />
            </TreeNode>

            {/* Biro Umum */}
            <TreeNode label={
                <OrgCard
                    name="Dr. Aris Darmansyah"
                    title="Kepala Biro"
                    role="Biro Umum"
                    image="https://picsum.photos/seed/biro2/200"
                />
            }>
                <TreeNode label={
                    <OrgCard
                        name="Siti Zulaikha"
                        title="Koordinator"
                        role="Bagian Rumah Tangga"
                    />
                } />
                <TreeNode label={
                    <OrgCard
                        name="Agus Wijaya"
                        title="Koordinator"
                        role="Bagian Perlengkapan"
                    />
                } />
            </TreeNode>

            {/* Pusdatin */}
            <TreeNode label={
                <OrgCard
                    name="M. Arief Hidayat"
                    title="Kepala Pusat"
                    role="Pusat Data & Info"
                    image="https://picsum.photos/seed/kapus1/200"
                />
            }>
                <TreeNode label={
                    <OrgCard
                        name="Diana Puspita"
                        title="Koordinator"
                        role="Infrastruktur TIK"
                    />
                } />
                <TreeNode label={
                    <OrgCard
                        name="Eko Prasetyo"
                        title="Koordinator"
                        role="Aplikasi & Sistem"
                    />
                } />
            </TreeNode>
        </Tree>
    );
}
