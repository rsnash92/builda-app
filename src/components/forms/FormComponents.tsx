'use client'

import { useState, forwardRef } from 'react'
import { Eye, EyeOff, ChevronDown, X, Upload, DollarSign, Search } from 'lucide-react'

// Base input component
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  size?: 'sm' | 'md' | 'lg'
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, leftIcon, rightIcon, size = 'md', className = '', ...props }, ref) => {
    const sizeClasses = {
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-3',
      lg: 'px-5 py-4 text-lg'
    }

    const iconSizeClasses = {
      sm: 'h-4 w-4',
      md: 'h-5 w-5',
      lg: 'h-6 w-6'
    }

    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-sm font-medium text-gray-300">
            {label}
            {props.required && <span className="text-red-400 ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400`}>
              <span className={iconSizeClasses[size]}>{leftIcon}</span>
            </div>
          )}

          <input
            ref={ref}
            className={`
              w-full bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400
              focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent
              disabled:opacity-50 disabled:cursor-not-allowed
              ${sizeClasses[size]}
              ${leftIcon ? 'pl-10' : ''}
              ${rightIcon ? 'pr-10' : ''}
              ${error ? 'border-red-500 focus:ring-red-500' : ''}
              ${className}
            `}
            {...props}
          />

          {rightIcon && (
            <div className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400`}>
              <span className={iconSizeClasses[size]}>{rightIcon}</span>
            </div>
          )}
        </div>

        {error && (
          <p className="text-sm text-red-400">{error}</p>
        )}

        {hint && !error && (
          <p className="text-sm text-gray-500">{hint}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

// Password input with toggle visibility
interface PasswordInputProps extends Omit<InputProps, 'type' | 'rightIcon'> {
  showToggle?: boolean
}

export function PasswordInput({ showToggle = true, ...props }: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false)

  const toggleVisibility = () => setShowPassword(!showPassword)

  return (
    <Input
      {...props}
      type={showPassword ? 'text' : 'password'}
      rightIcon={
        showToggle ? (
          <button
            type="button"
            onClick={toggleVisibility}
            className="hover:text-gray-300 transition-colors"
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        ) : undefined
      }
    />
  )
}

// Textarea component
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  hint?: string
  resize?: boolean
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, resize = true, className = '', ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-sm font-medium text-gray-300">
            {label}
            {props.required && <span className="text-red-400 ml-1">*</span>}
          </label>
        )}

        <textarea
          ref={ref}
          className={`
            w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400
            focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent
            disabled:opacity-50 disabled:cursor-not-allowed
            ${!resize ? 'resize-none' : 'resize-y'}
            ${error ? 'border-red-500 focus:ring-red-500' : ''}
            ${className}
          `}
          {...props}
        />

        {error && (
          <p className="text-sm text-red-400">{error}</p>
        )}

        {hint && !error && (
          <p className="text-sm text-gray-500">{hint}</p>
        )}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'

// Select component
interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

interface SelectProps {
  label?: string
  error?: string
  hint?: string
  options: SelectOption[]
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  disabled?: boolean
  required?: boolean
}

export function Select({
  label,
  error,
  hint,
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  disabled = false,
  required = false
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const selectedOption = options.find(option => option.value === value)

  const handleSelect = (optionValue: string) => {
    onChange?.(optionValue)
    setIsOpen(false)
  }

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-300">
          {label}
          {required && <span className="text-red-400 ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        <button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className={`
            w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-left
            focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent
            disabled:opacity-50 disabled:cursor-not-allowed
            ${error ? 'border-red-500 focus:ring-red-500' : ''}
            ${isOpen ? 'ring-2 ring-orange-500 border-transparent' : ''}
          `}
        >
          <div className="flex items-center justify-between">
            <span className={selectedOption ? 'text-white' : 'text-gray-400'}>
              {selectedOption?.label || placeholder}
            </span>
            <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </div>
        </button>

        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setIsOpen(false)}
            />
            <div className="absolute z-20 w-full mt-1 bg-gray-800 border border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => !option.disabled && handleSelect(option.value)}
                  disabled={option.disabled}
                  className={`
                    w-full px-4 py-3 text-left hover:bg-gray-700 transition-colors
                    ${option.disabled ? 'opacity-50 cursor-not-allowed' : ''}
                    ${option.value === value ? 'bg-orange-500/20 text-orange-400' : 'text-white'}
                  `}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {error && (
        <p className="text-sm text-red-400">{error}</p>
      )}

      {hint && !error && (
        <p className="text-sm text-gray-500">{hint}</p>
      )}
    </div>
  )
}

// Multi-select component
interface MultiSelectProps {
  label?: string
  error?: string
  hint?: string
  options: SelectOption[]
  value?: string[]
  onChange?: (values: string[]) => void
  placeholder?: string
  disabled?: boolean
  required?: boolean
}

export function MultiSelect({
  label,
  error,
  hint,
  options,
  value = [],
  onChange,
  placeholder = 'Select options',
  disabled = false,
  required = false
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const selectedOptions = options.filter(option => value.includes(option.value))

  const handleToggle = (optionValue: string) => {
    const newValue = value.includes(optionValue)
      ? value.filter(v => v !== optionValue)
      : [...value, optionValue]
    onChange?.(newValue)
  }

  const removeOption = (optionValue: string) => {
    onChange?.(value.filter(v => v !== optionValue))
  }

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-300">
          {label}
          {required && <span className="text-red-400 ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        <div
          onClick={() => !disabled && setIsOpen(!isOpen)}
          className={`
            w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg cursor-pointer
            focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
            ${error ? 'border-red-500' : ''}
            ${isOpen ? 'ring-2 ring-orange-500 border-transparent' : ''}
          `}
        >
          {selectedOptions.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {selectedOptions.map((option) => (
                <span
                  key={option.value}
                  className="inline-flex items-center px-2 py-1 bg-orange-500/20 text-orange-400 text-sm rounded border border-orange-500/30"
                >
                  {option.label}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      removeOption(option.value)
                    }}
                    className="ml-1 hover:text-orange-300"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          ) : (
            <span className="text-gray-400">{placeholder}</span>
          )}

          <ChevronDown className={`absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </div>

        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setIsOpen(false)}
            />
            <div className="absolute z-20 w-full mt-1 bg-gray-800 border border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => !option.disabled && handleToggle(option.value)}
                  disabled={option.disabled}
                  className={`
                    w-full px-4 py-3 text-left hover:bg-gray-700 transition-colors flex items-center justify-between
                    ${option.disabled ? 'opacity-50 cursor-not-allowed' : ''}
                    ${value.includes(option.value) ? 'bg-orange-500/20 text-orange-400' : 'text-white'}
                  `}
                >
                  {option.label}
                  {value.includes(option.value) && (
                    <div className="w-4 h-4 bg-orange-500 rounded-sm flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {error && (
        <p className="text-sm text-red-400">{error}</p>
      )}

      {hint && !error && (
        <p className="text-sm text-gray-500">{hint}</p>
      )}
    </div>
  )
}

// Currency input component
interface CurrencyInputProps extends Omit<InputProps, 'leftIcon' | 'type'> {
  currency?: string
}

export function CurrencyInput({ currency = 'USD', ...props }: CurrencyInputProps) {
  return (
    <Input
      {...props}
      type="number"
      leftIcon={<DollarSign className="h-5 w-5" />}
      placeholder={`0.00 ${currency}`}
    />
  )
}

// Search input component
interface SearchInputProps extends Omit<InputProps, 'leftIcon' | 'type'> {
  onClear?: () => void
  showClearButton?: boolean
}

export function SearchInput({ onClear, showClearButton = true, value, ...props }: SearchInputProps) {
  return (
    <Input
      {...props}
      type="search"
      value={value}
      leftIcon={<Search className="h-5 w-5" />}
      rightIcon={
        showClearButton && value ? (
          <button
            type="button"
            onClick={onClear}
            className="hover:text-gray-300 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        ) : undefined
      }
    />
  )
}

// File upload component
interface FileUploadProps {
  label?: string
  error?: string
  hint?: string
  accept?: string
  multiple?: boolean
  disabled?: boolean
  required?: boolean
  onChange?: (files: FileList | null) => void
  value?: FileList | null
}

export function FileUpload({
  label,
  error,
  hint,
  accept,
  multiple = false,
  disabled = false,
  required = false,
  onChange,
  value
}: FileUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false)

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    if (!disabled) {
      onChange?.(e.dataTransfer.files)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = () => {
    setIsDragOver(false)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.files)
  }

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-300">
          {label}
          {required && <span className="text-red-400 ml-1">*</span>}
        </label>
      )}

      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`
          relative border-2 border-dashed rounded-lg p-6 transition-colors cursor-pointer
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          ${error ? 'border-red-500' : isDragOver ? 'border-orange-500 bg-orange-500/10' : 'border-gray-700 hover:border-gray-600'}
        `}
      >
        <input
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          onChange={handleFileChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
        />

        <div className="text-center">
          <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <div className="text-white font-medium mb-2">
            {value && value.length > 0
              ? `${value.length} file${value.length > 1 ? 's' : ''} selected`
              : 'Drop files here or click to upload'
            }
          </div>
          <p className="text-sm text-gray-400">
            {accept ? `Accepts: ${accept}` : 'Any file type'}
            {multiple && ' (Multiple files allowed)'}
          </p>
        </div>
      </div>

      {error && (
        <p className="text-sm text-red-400">{error}</p>
      )}

      {hint && !error && (
        <p className="text-sm text-gray-500">{hint}</p>
      )}
    </div>
  )
}

// Toggle/Switch component
interface ToggleProps {
  label?: string
  description?: string
  checked?: boolean
  onChange?: (checked: boolean) => void
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export function Toggle({
  label,
  description,
  checked = false,
  onChange,
  disabled = false,
  size = 'md'
}: ToggleProps) {
  const sizeClasses = {
    sm: 'w-8 h-5',
    md: 'w-11 h-6',
    lg: 'w-14 h-8'
  }

  const knobClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-7 h-7'
  }

  const translateClasses = {
    sm: checked ? 'translate-x-3' : 'translate-x-0.5',
    md: checked ? 'translate-x-5' : 'translate-x-0.5',
    lg: checked ? 'translate-x-6' : 'translate-x-0.5'
  }

  return (
    <div className="flex items-center justify-between">
      {(label || description) && (
        <div className="flex-1 mr-4">
          {label && (
            <div className="text-sm font-medium text-white">{label}</div>
          )}
          {description && (
            <div className="text-sm text-gray-400">{description}</div>
          )}
        </div>
      )}

      <button
        type="button"
        onClick={() => !disabled && onChange?.(!checked)}
        disabled={disabled}
        className={`
          relative inline-flex items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-gray-900
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          ${checked ? 'bg-orange-500' : 'bg-gray-700'}
          ${sizeClasses[size]}
        `}
      >
        <span
          className={`
            inline-block bg-white rounded-full transition-transform
            ${knobClasses[size]}
            ${translateClasses[size]}
          `}
        />
      </button>
    </div>
  )
}

// Form validation helpers
export const validators = {
  required: (message = 'This field is required') => (value: any) => {
    if (!value || (typeof value === 'string' && !value.trim())) {
      return message
    }
    return null
  },

  email: (message = 'Please enter a valid email address') => (value: string) => {
    if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return message
    }
    return null
  },

  minLength: (min: number, message?: string) => (value: string) => {
    if (value && value.length < min) {
      return message || `Must be at least ${min} characters`
    }
    return null
  },

  maxLength: (max: number, message?: string) => (value: string) => {
    if (value && value.length > max) {
      return message || `Must be no more than ${max} characters`
    }
    return null
  },

  pattern: (regex: RegExp, message = 'Invalid format') => (value: string) => {
    if (value && !regex.test(value)) {
      return message
    }
    return null
  },

  min: (min: number, message?: string) => (value: number) => {
    if (value !== undefined && value < min) {
      return message || `Must be at least ${min}`
    }
    return null
  },

  max: (max: number, message?: string) => (value: number) => {
    if (value !== undefined && value > max) {
      return message || `Must be no more than ${max}`
    }
    return null
  }
}