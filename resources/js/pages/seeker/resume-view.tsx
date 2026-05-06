import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Download, FilePenLine } from 'lucide-react';
import { type ReactNode } from 'react';

type Resume = {
    first_name: string;
    middle_name: string | null;
    last_name: string;
    mobile_1: string | null;
    mobile_2: string | null;
    email: string;
    current_address: string | null;
    college_school: string | null;
    college_year: string | null;
    position: string | null;
    company: string | null;
};

type ResumeViewProps = {
    resume: Resume | null;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Resume',
        href: '/dashboard/resume',
    },
    {
        title: 'View',
        href: '/dashboard/resume/view',
    },
];

function fullName(resume: Resume): string {
    return [resume.first_name, resume.middle_name, resume.last_name].filter(Boolean).join(' ');
}

function hasValue(value?: string | null): value is string {
    return Boolean(value && value.trim() !== '');
}

function DetailItem({ label, value }: { label: string; value?: string | null }) {
    if (!hasValue(value)) {
        return null;
    }

    return (
        <div>
            <dt className="text-xs font-semibold tracking-wide text-neutral-500 uppercase dark:text-neutral-400">{label}</dt>
            <dd className="mt-1 text-sm text-neutral-800 dark:text-neutral-200">{value}</dd>
        </div>
    );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
    return (
        <section className="border-t border-neutral-200 pt-6 first:border-t-0 first:pt-0 dark:border-neutral-700 print:border-neutral-300">
            <h2 className="text-sm font-bold tracking-[0.2em] text-purple-700 uppercase dark:text-purple-300 print:text-purple-800">{title}</h2>
            <div className="mt-4">{children}</div>
        </section>
    );
}

export default function ResumeView({ resume }: ResumeViewProps) {
    const downloadPdf = () => {
        window.print();
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="View Resume">
                <style>{`@media print { body * { visibility: hidden; } #resume-paper, #resume-paper * { visibility: visible; } #resume-paper { position: absolute; inset: 0; width: 100%; } }`}</style>
            </Head>

            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-4 print:block print:bg-white print:p-0">
                <div className="flex flex-col justify-between gap-4 rounded-xl border border-neutral-200 bg-white p-6 shadow-sm md:flex-row md:items-center dark:border-neutral-800 dark:bg-neutral-950 print:hidden">
                    <div>
                        <p className="text-sm font-medium text-purple-700 dark:text-purple-300">Resume preview</p>
                        <h1 className="mt-1 text-2xl font-semibold text-neutral-950 dark:text-neutral-50">Review and download your resume</h1>
                        <p className="mt-2 max-w-2xl text-sm text-neutral-600 dark:text-neutral-400">
                            Use the download button to open your browser print dialog, then choose “Save as PDF”.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <Link

                            className="inline-flex items-center justify-center gap-2 rounded-md border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-800 transition hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:hover:bg-neutral-800"
                        >
                            <FilePenLine className="h-4 w-4" />
                            Edit resume
                        </Link>

                        <button
                            type="button"
                            onClick={downloadPdf}
                            disabled={!resume}
                            className="inline-flex items-center justify-center gap-2 rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-purple-700 disabled:pointer-events-none disabled:opacity-50"
                        >
                            <Download className="h-4 w-4" />
                            Download PDF
                        </button>
                    </div>
                </div>

                {!resume ? (
                    <div className="rounded-xl border border-dashed border-neutral-300 bg-white p-10 text-center shadow-sm dark:border-neutral-700 dark:bg-neutral-950 print:hidden">
                        <h2 className="text-xl font-semibold text-neutral-950 dark:text-neutral-50">No resume yet</h2>
                        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                            Create your resume first, then come back here to view and download it.
                        </p>
                        <Link

                            className="mt-6 inline-flex items-center justify-center rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-purple-700"
                        >
                            Create resume
                        </Link>
                    </div>
                ) : (
                    <article
                        id="resume-paper"
                        className="mx-auto w-full max-w-4xl rounded-xl border border-neutral-200 bg-white p-8 shadow-sm md:p-12 dark:border-neutral-800 dark:bg-neutral-950 print:m-0 print:max-w-none print:rounded-none print:border-0 print:bg-white print:p-8 print:text-black print:shadow-none"
                    >
                        <header className="border-b border-neutral-200 pb-8 dark:border-neutral-700 print:border-neutral-300">
                            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                                <div>
                                    <h1 className="text-4xl font-bold tracking-tight text-neutral-950 dark:text-neutral-50 print:text-black">
                                        {fullName(resume)}
                                    </h1>
                                    {hasValue(resume.position) && (
                                        <p className="mt-3 text-lg font-medium text-purple-700 dark:text-purple-300 print:text-purple-800">
                                            {resume.position}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-1 text-sm text-neutral-600 dark:text-neutral-300 print:text-neutral-700">
                                    <p>{resume.email}</p>
                                    {hasValue(resume.mobile_1) && <p>{resume.mobile_1}</p>}
                                    {hasValue(resume.mobile_2) && <p>{resume.mobile_2}</p>}
                                    {hasValue(resume.current_address) && <p>{resume.current_address}</p>}
                                </div>
                            </div>
                        </header>

                        <div className="mt-8 grid gap-8">
                            <Section title="Profile">
                                <p className="text-sm leading-7 text-neutral-700 dark:text-neutral-300 print:text-neutral-800">
                                    A motivated candidate with resume details ready for employers to review. Update your resume information to
                                    customize this summary for your target role.
                                </p>
                            </Section>

                            <Section title="Education">
                                <dl className="grid gap-6 md:grid-cols-2">
                                    <DetailItem label="College / School" value={resume.college_school} />
                                    <DetailItem label="Year" value={resume.college_year} />
                                </dl>
                            </Section>

                            <Section title="Experience">
                                <dl className="grid gap-6 md:grid-cols-2">
                                    <DetailItem label="Position" value={resume.position} />
                                    <DetailItem label="Company" value={resume.company} />
                                </dl>
                            </Section>

                            <Section title="Contact">
                                <dl className="grid gap-6 md:grid-cols-2">
                                    <DetailItem label="Email" value={resume.email} />
                                    <DetailItem label="Mobile No. 1" value={resume.mobile_1} />
                                    <DetailItem label="Mobile No. 2" value={resume.mobile_2} />
                                    <DetailItem label="Current Address" value={resume.current_address} />
                                </dl>
                            </Section>
                        </div>
                    </article>
                )}
            </div>
        </AppLayout>
    );
}
