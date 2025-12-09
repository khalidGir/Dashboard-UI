import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useThemeStore } from '../store/useThemeStore';
import Input from '../components/form/Input';
import Select from '../components/form/Select';
import Button from '../components/Button';

interface IFormInput {
  username: string;
  email: string;
  language: string;
}

const SettingsPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = data => console.log(data);

  const { primaryColor, setPrimaryColor, isDarkMode, toggleDarkMode } = useThemeStore();

  const languageOptions = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Spanish' },
    { value: 'fr', label: 'French' },
  ];

  // Predefined color options
  const colorOptions = [
    { name: 'Blue', value: '#3b82f6' },      // blue-500
    { name: 'Green', value: '#22c55e' },     // green-500
    { name: 'Red', value: '#ef4444' },       // red-500
    { name: 'Purple', value: '#a855f7' },    // purple-500
    { name: 'Yellow', value: '#eab308' },    // yellow-500
    { name: 'Indigo', value: '#6366f1' },    // indigo-500
  ];

  return (
    <div className="p-6 bg-bg-secondary dark:bg-bg-secondary rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-text-primary dark:text-text-primary mb-6">Settings</h2>

      <div className="space-y-6">
        {/* Theme Settings Section */}
        <div className="p-4 bg-bg-tertiary dark:bg-bg-tertiary rounded-lg">
          <h3 className="text-lg font-medium text-text-primary dark:text-text-primary mb-4">Theme Settings</h3>

          <div className="mb-4">
            <label className="block text-sm font-medium text-text-secondary dark:text-text-secondary mb-2">
              Primary Color
            </label>
            <div className="flex items-center gap-4">
              <input
                type="color"
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                className="w-12 h-10 rounded border border-border-color cursor-pointer"
              />
              <span className="text-sm text-text-secondary dark:text-text-secondary">
                {primaryColor.toUpperCase()}
              </span>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-text-secondary dark:text-text-secondary mb-2">
              Color Presets
            </label>
            <div className="flex flex-wrap gap-2">
              {colorOptions.map((color) => (
                <button
                  key={color.value}
                  onClick={() => setPrimaryColor(color.value)}
                  className={`w-8 h-8 rounded-full border-2 ${
                    primaryColor === color.value
                      ? 'border-text-primary dark:border-text-primary'
                      : 'border-transparent'
                  }`}
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={isDarkMode}
                onChange={toggleDarkMode}
                className="sr-only"
              />
              <div className="flex items-center">
                <div
                  className={`w-12 h-6 flex items-center rounded-full p-1 mr-2 transition-colors ${
                    isDarkMode ? 'bg-primary' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                      isDarkMode ? 'translate-x-6' : ''
                    }`}
                  />
                </div>
                <span className="text-sm font-medium text-text-secondary dark:text-text-secondary">
                  {isDarkMode ? 'Dark Mode' : 'Light Mode'}
                </span>
              </div>
            </label>
          </div>
        </div>

        {/* Account Settings Section */}
        <div className="p-4 bg-bg-tertiary dark:bg-bg-tertiary rounded-lg">
          <h3 className="text-lg font-medium text-text-primary dark:text-text-primary mb-4">Account Settings</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              label="Username"
              name="username"
              register={register("username", { required: "Username is required", minLength: { value: 3, message: "Username must be at least 3 characters" } })}
              error={errors.username?.message}
            />
            <Input
              label="Email"
              name="email"
              type="email"
              register={register("email", { required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" } })}
              error={errors.email?.message}
            />
            <Select
              label="Language"
              name="language"
              options={languageOptions}
              register={register("language")}
              error={errors.language?.message}
            />
            <Button type="submit">Save Settings</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
