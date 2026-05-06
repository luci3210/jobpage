import { useState, FormEventHandler } from 'react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';  
import { Head, useForm } from '@inertiajs/react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';

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
        post(route('seeker.resume.store'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Resume" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 rounded-xl border p-6 md:min-h-min">

                    {/* Progress Stepper */}
                    <div className="relative mb-10 h-1 w-full rounded bg-gray-300">
                        <div
                            className="absolute left-0 top-0 h-1 rounded bg-purple-600"
                            style={{ width: `${progress}%` }}
                        ></div>

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
    <div className="grid gap-6 mb-6 md:grid-cols-3">

{currentStep === 1 && (
    <>
        <div>
            <label htmlFor="first_name" className="block mb-1.5 text-sm font-medium text-heading">
                First Name <span className='text-red-600'>*</span>
            </label>
            <input
                type="text"
                id="first_name"
                value={data.first_name}
                onChange={(e) => setData('first_name',e.target.value)}
                className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                placeholder="John"  
            />
        </div>

        <div>
            <label htmlFor="middle_name" className="block mb-1.5 text-sm font-medium text-heading">
                Middle Name <span className='text-red-600'>*</span>
            </label>
            <input
                type="text"
                id="middle_name"
                value={data.middle_name}
                onChange={(e) => setData('middle_name',e.target.value)}
                className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                placeholder="John"
                required
            />
        </div>

        <div>
            <label htmlFor="last_name" className="block mb-1.5 text-sm font-medium text-heading">
                Last Name <span className='text-red-600'>*</span>
            </label>
            <input
                type="text"
                id="last_name"
                value={data.last_name}
                onChange={(e) => setData('last_name',e.target.value)}
                className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                placeholder="John"
                required
            />
        </div>

        <div>
            <label htmlFor="mobile_1" className="block mb-1.5 text-sm font-medium text-heading">
                Mobile No. (1) <span className='text-red-600'>*</span>
            </label>
            <input
                type="text"
                id="mobile_1"
                value={data.mobile_1}
                onChange={(e) => setData('mobile_1',e.target.value)}
                className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                placeholder="John"
                required
            />
        </div>

        <div>
            <label htmlFor="mobile_2" className="block mb-1.5 text-sm font-medium text-heading">
                Mobile No. (2) 
            </label>
            <input
                type="text"
                id="mobile_2"
                value={data.mobile_2}
                onChange={(e) => setData('mobile_2',e.target.value)}
                className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                placeholder="John"
                required
            />
        </div>

        <div>
            <label htmlFor="email" className="block mb-1.5 text-sm font-medium text-heading">
                Email Address <span className='text-red-600'>*</span>
            </label>
            <input
                type="text"
                id="email"
                value={data.email}
                onChange={(e) => setData('email',e.target.value)}
                className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                placeholder="John"
                required
            />
        </div>

        <div className="md:col-span-3">
        <label htmlFor="current_address" className="block mb-1.5 text-sm font-medium text-heading">
            Current Address <span className='text-red-600'>*</span>
        </label>

        <input
            type="text"
            id="current_address"
            value={data.current_address}
            onChange={(e) => setData('current_address',e.target.value)}
            className="block w-full bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand px-3 py-2.5 shadow-xs placeholder:text-body"
            placeholder="John"
            required
        />
    </div>

    </>
)}

{currentStep === 2 && (
    <>
        <div>
            <label htmlFor="company" className="block mb-2.5 text-sm font-medium text-heading">
                College School
            </label>
            <input
                type="text"
                id="college_school"
                value={data.college_school}
                onChange={(e) => setData('college_school',e.target.value)}
                className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                placeholder="Flowbite"
                required
            />
        </div>

        <div>
            <label htmlFor="phone" className="block mb-2.5 text-sm font-medium text-heading">
                Year
            </label>
            <input
                type="text"
                id="college_year"
                value={data.college_year}
                onChange={(e) => setData('college_year',e.target.value)}
                className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                placeholder="123-45-678"
                required
            />
        </div>
    </>
)}

{currentStep === 3 && (
    <>
        <div>
            <label htmlFor="website" className="block mb-2.5 text-sm font-medium text-heading">
                Position
            </label>
            <input
                type="text"
                id="position"
                onChange={(e) => setData('position',e.target.value)}
                className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                placeholder="flowbite.com"
                required
            />
        </div>

        <div>
            <label htmlFor="visitors" className="block mb-2.5 text-sm font-medium text-heading">
                Company
            </label>
            <input
                type="text"
                id="company"
                onChange={(e) => setData('company',e.target.value)}
                className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                required
            />
        </div>
    </>
)}

                        </div>

                        <div className="flex justify-between">
                            <button
                                type="button"
                                onClick={prevStep}
                                disabled={currentStep === 1}
                                className="rounded-md bg-gray-500 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
                            >
                                Previous
                            </button>

                            <button
                                type="submit"
                                className="rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white"
                            >
                                {currentStep === totalSteps ? 'Submit' : 'Next'}
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </AppLayout>
    );
}