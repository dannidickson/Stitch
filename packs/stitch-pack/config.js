// ignore most of this
export const stepsConfig = {
  step1: {
    title: 'Personal Information',
    description: 'Please provide your basic information',
    component: 'FormStep', // Optional: custom component for entire step
    fields: [
      {
        name: 'firstName',
        title: 'First Name',
        type: 'text',
        required: true,
        validation: 'required|min:2',
      },
      {
        name: 'email',
        title: 'Email Address',
        type: 'email',
        required: true,
        validation: 'required|email',
      },
      {
        name: 'subscribe',
        title: 'Subscribe to newsletter',
        type: 'checkbox',
        defaultValue: false,
      },
    ],
  },
  step2: {
    title: 'Preferences',
    description: 'Configure your preferences',
    fields: [
      {
        name: 'theme',
        title: 'Theme',
        type: 'select',
        options: [
          { value: 'light', label: 'Light' },
          { value: 'dark', label: 'Dark' },
        ],
        defaultValue: 'light',
      },
      {
        name: 'notifications',
        title: 'Enable Notifications',
        type: 'toggle',
        defaultValue: true,
      },
      {
        name: 'bio',
        title: 'Bio',
        type: 'textarea',
        placeholder: 'Tell us about yourself...',
      },
    ],
  },
  step3: {
    title: 'Custom Step',
    description: 'This step uses a completely custom component',
    component: 'CustomStepComponent',
  },
}
