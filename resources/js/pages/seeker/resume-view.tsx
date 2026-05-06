import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Resume',
        href: '/dashboard/resume',
    },
];

export default function ResumeView() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Resume" />
        </AppLayout>
    );
}
