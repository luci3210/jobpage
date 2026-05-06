import InputError from '@/components/input-error';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Transition } from '@headlessui/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

type ResumeForm = {
    first_name: string;
    middle_name: string;
    last_name: string;
    mobile_1: string;
    mobile_2: string;
    email: string;
    current_address: string;
    college_school: string;
    college_year: string;
    position: string;
    company: string;
};

type ResumeProps = {
    resume?: Partial<ResumeForm> | null;
};

export default function Resume({ resume }: ResumeProps) {
    const { data, setData, post, processing, errors, recentlySuccessful } = useForm<ResumeForm>({
        first_name: resume?.first_name ?? '',
        middle_name: resume?.middle_name ?? '',
        last_name: resume?.last_name ?? '',
        mobile_1: resume?.mobile_1 ?? '',
        mobile_2: resume?.mobile_2 ?? '',
        email: resume?.email ?? '',
        current_address: resume?.current_address ?? '',
        college_school: resume?.college_school ?? '',
        college_year: resume?.college_year ?? '',
        position: resume?.position ?? '',
        company: resume?.company ?? '',
    });

    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 3;

    const progress = ((currentStep - 1) / (totalSteps - 1)) * 100;

    const nextStep = () => {
        if (currentStep < totalSteps) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();

        if (currentStep < totalSteps) {
            nextStep();
            return;
        }


    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Resume" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 rounded-xl border p-6 md:min-h-min">
                    <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
                        <div>
                            <h1 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">Build your resume</h1>
                            <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                                Complete the sections below, then preview or download your resume.
                            </p>
                        </div>

                        {resume && (
                            <Link
                                href="/dashboard/resume/view"
                                className="inline-flex items-center justify-center rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-purple-700"
                            >
                                View resume
                            </Link>
                        )}
                    </div>

                    <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
                        <div>
                            <h1 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">Build your resume</h1>
                            <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                                Complete the sections below, then preview or download your resume.
                            </p>
                        </div>

                        {resume && (
                            <Link
                                href={route('seeker.resume.show')}
                                className="inline-flex items-center justify-center rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-purple-700"
                            >
                                View resume
                            </Link>
                        )}
                    </div>


                    {/* Progress Stepper */}
                    <div className="relative mb-10 h-1 w-full rounded bg-gray-300">
                        <div className="absolute top-0 left-0 h-1 rounded bg-purple-600" style={{ width: `${progress}%` }}></div>

                        <div className="absolute -top-2 left-0 flex w-full justify-between">
                            {[1, 2, 3].map((step) => (
                                <div
                                    key={step}
                                    className={`rounded-full ${
                                        step === currentStep
                                            ? 'h-5 w-5 border-4 border-purple-600 bg-white'
                                            : step < currentStep
                                              ? 'h-4 w-4 bg-purple-600'
                                              : 'h-4 w-4 bg-gray-400'
                                    }`}
                                ></div>
                            ))}
                        </div>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-6 grid gap-6 md:grid-cols-3">
                            {currentStep === 1 && (
                                <>
                                    <div>
                                        <label htmlFor="first_name" className="text-heading mb-1.5 block text-sm font-medium">
                                            First Name <span className="text-red-600">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            id="first_name"
                                            value={data.first_name}
                                            onChange={(e) => setData('first_name', e.target.value)}
                                            className="rounded-base border-default-medium bg-neutral-secondary-medium text-heading placeholder:text-body focus:border-brand focus:ring-brand block w-full border px-3 py-2.5 text-sm shadow-xs"
                                            placeholder="John"
                                            required
                                        />
                                        <InputError message={errors.first_name} className="mt-2" />
                                    </div>


                                    <div>
                                        <label htmlFor="middle_name" className="text-heading mb-1.5 block text-sm font-medium">
                                            Middle Name
                                        </label>
                                        <input
                                            type="text"
                                            id="middle_name"
                                            value={data.middle_name}
                                            onChange={(e) => setData('middle_name', e.target.value)}
                                            className="rounded-base border-default-medium bg-neutral-secondary-medium text-heading placeholder:text-body focus:border-brand focus:ring-brand block w-full border px-3 py-2.5 text-sm shadow-xs"
                                            placeholder="Michael"
                                        />
                                        <InputError message={errors.middle_name} className="mt-2" />
                                    </div>

                                    <div>
                                        <label htmlFor="last_name" className="text-heading mb-1.5 block text-sm font-medium">
                                            Last Name <span className="text-red-600">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            id="last_name"
                                            value={data.last_name}
                                            onChange={(e) => setData('last_name', e.target.value)}
                                            className="rounded-base border-default-medium bg-neutral-secondary-medium text-heading placeholder:text-body focus:border-brand focus:ring-brand block w-full border px-3 py-2.5 text-sm shadow-xs"
                                            placeholder="Doe"
                                            required
                                        />
                                        <InputError message={errors.last_name} className="mt-2" />
                                    </div>

                                    <div>
                                        <label htmlFor="mobile_1" className="text-heading mb-1.5 block text-sm font-medium">
                                            Mobile No. (1)
                                        </label>
                                        <input
                                            type="text"
                                            id="mobile_1"
                                            value={data.mobile_1}
                                            onChange={(e) => setData('mobile_1', e.target.value)}
                                            className="rounded-base border-default-medium bg-neutral-secondary-medium text-heading placeholder:text-body focus:border-brand focus:ring-brand block w-full border px-3 py-2.5 text-sm shadow-xs"
                                            placeholder="123-456-7890"
                                        />
                                        <InputError message={errors.mobile_1} className="mt-2" />
                                    </div>

                                    <div>
                                        <label htmlFor="mobile_2" className="text-heading mb-1.5 block text-sm font-medium">
                                            Mobile No. (2)
                                        </label>
                                        <input
                                            type="text"
                                            id="mobile_2"
                                            value={data.mobile_2}
                                            onChange={(e) => setData('mobile_2', e.target.value)}
                                            className="rounded-base border-default-medium bg-neutral-secondary-medium text-heading placeholder:text-body focus:border-brand focus:ring-brand block w-full border px-3 py-2.5 text-sm shadow-xs"
                                            placeholder="123-456-7890"
                                        />
                                        <InputError message={errors.mobile_2} className="mt-2" />
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="text-heading mb-1.5 block text-sm font-medium">
                                            Email Address <span className="text-red-600">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            className="rounded-base border-default-medium bg-neutral-secondary-medium text-heading placeholder:text-body focus:border-brand focus:ring-brand block w-full border px-3 py-2.5 text-sm shadow-xs"
                                            placeholder="john@example.com"
                                            required
                                        />
                                        <InputError message={errors.email} className="mt-2" />
                                    </div>

                                    <div className="md:col-span-3">
                                        <label htmlFor="current_address" className="text-heading mb-1.5 block text-sm font-medium">
                                            Current Address
                                        </label>
                                        <input
                                            type="text"
                                            id="current_address"
                                            value={data.current_address}
                                            onChange={(e) => setData('current_address', e.target.value)}
                                            className="rounded-base border-default-medium bg-neutral-secondary-medium text-heading placeholder:text-body focus:border-brand focus:ring-brand block w-full border px-3 py-2.5 text-sm shadow-xs"
                                            placeholder="Street, City, State"
                                        />
                                        <InputError message={errors.current_address} className="mt-2" />
                                    </div>
                                </>
                            )}

                            {currentStep === 2 && (
                                <>
                                    <div>
                                        <label htmlFor="college_school" className="text-heading mb-2.5 block text-sm font-medium">
                                            College School
                                        </label>
                                        <input
                                            type="text"
                                            id="college_school"
                                            value={data.college_school}
                                            onChange={(e) => setData('college_school', e.target.value)}
                                            className="rounded-base border-default-medium bg-neutral-secondary-medium text-heading placeholder:text-body focus:border-brand focus:ring-brand block w-full border px-3 py-2.5 text-sm shadow-xs"
                                            placeholder="College or university"
                                        />
                                        <InputError message={errors.college_school} className="mt-2" />
                                    </div>

                                        <label htmlFor="company" className="text-heading mb-2.5 block text-sm font-medium">
                                            Company
                                        </label>
                                        <input
                                            type="text"
                                            id="company"
                                            value={data.company}
                                            onChange={(e) => setData('company', e.target.value)}
                                            className="rounded-base border-default-medium bg-neutral-secondary-medium text-heading placeholder:text-body focus:border-brand focus:ring-brand block w-full border px-3 py-2.5 text-sm shadow-xs"
                                            placeholder="Company name"
                                        />
                                        <InputError message={errors.company} className="mt-2" />
                                    </div>
                                </>
                            )}
                        </div>

                        <div className="flex items-center justify-between gap-4">
                            <button
                                type="button"
                                onClick={prevStep}
                                disabled={currentStep === 1 || processing}
                                className="rounded-md bg-gray-500 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
                            >
                                Previous
                            </button>

                            <div className="flex items-center gap-4">
                                <Transition
                                    show={recentlySuccessful}
                                    enter="transition ease-in-out"
                                    enterFrom="opacity-0"
                                    leave="transition ease-in-out"
                                    leaveTo="opacity-0"
                                >
                                    <p className="text-sm text-green-600">Resume saved.</p>
                                </Transition>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="inline-flex items-center gap-2 rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
                                >
                                    {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                    {currentStep === totalSteps ? 'Submit' : 'Next'}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
