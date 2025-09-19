'use client'

import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  showCloseButton?: boolean
  closeOnOverlayClick?: boolean
  closeOnEscape?: boolean
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEscape = true
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)

  // Handle escape key
  useEffect(() => {
    if (!closeOnEscape) return

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose, closeOnEscape])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Focus management
  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.focus()
    }
  }, [isOpen])

  if (!isOpen) return null

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    full: 'max-w-full mx-4'
  }

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={handleOverlayClick}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Modal */}
      <div
        ref={modalRef}
        className={`relative w-full ${sizeClasses[size]} bg-gray-900 border border-gray-800 rounded-lg shadow-xl max-h-[90vh] overflow-hidden focus:outline-none`}
        tabIndex={-1}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between p-6 border-b border-gray-800">
            {title && (
              <h2 className="text-xl font-semibold text-white">{title}</h2>
            )}
            {showCloseButton && (
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
          {children}
        </div>
      </div>
    </div>
  )
}

// Confirmation modal
interface ConfirmModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  variant?: 'danger' | 'warning' | 'info'
}

export function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'info'
}: ConfirmModalProps) {
  const handleConfirm = () => {
    onConfirm()
    onClose()
  }

  const variantStyles = {
    danger: 'bg-red-500 hover:bg-red-600',
    warning: 'bg-yellow-500 hover:bg-yellow-600',
    info: 'bg-orange-500 hover:bg-orange-600'
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">
      <div className="p-6">
        <p className="text-gray-300 mb-6">{message}</p>
        <div className="flex space-x-3 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
          >
            {cancelText}
          </button>
          <button
            onClick={handleConfirm}
            className={`px-4 py-2 text-white rounded-lg transition-colors ${variantStyles[variant]}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </Modal>
  )
}

// Loading modal
interface LoadingModalProps {
  isOpen: boolean
  title?: string
  message?: string
}

export function LoadingModal({
  isOpen,
  title = 'Loading...',
  message = 'Please wait while we process your request.'
}: LoadingModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {}}
      title={title}
      size="sm"
      showCloseButton={false}
      closeOnOverlayClick={false}
      closeOnEscape={false}
    >
      <div className="p-6 text-center">
        <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-300">{message}</p>
      </div>
    </Modal>
  )
}

// Success modal
interface SuccessModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  message: string
  actionText?: string
  onAction?: () => void
}

export function SuccessModal({
  isOpen,
  onClose,
  title,
  message,
  actionText,
  onAction
}: SuccessModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">
      <div className="p-6 text-center">
        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="text-gray-300 mb-6">{message}</p>
        <div className="flex space-x-3 justify-center">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
          >
            Close
          </button>
          {actionText && onAction && (
            <button
              onClick={() => {
                onAction()
                onClose()
              }}
              className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
            >
              {actionText}
            </button>
          )}
        </div>
      </div>
    </Modal>
  )
}

// Form modal with custom content
interface FormModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  onSubmit?: () => void
  submitText?: string
  submitDisabled?: boolean
  isLoading?: boolean
}

export function FormModal({
  isOpen,
  onClose,
  title,
  children,
  onSubmit,
  submitText = 'Submit',
  submitDisabled = false,
  isLoading = false
}: FormModalProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (onSubmit && !submitDisabled && !isLoading) {
      onSubmit()
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <form onSubmit={handleSubmit}>
        <div className="p-6">
          {children}
        </div>

        {onSubmit && (
          <div className="flex justify-end space-x-3 p-6 border-t border-gray-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitDisabled || isLoading}
              className="px-4 py-2 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed text-white rounded-lg transition-colors flex items-center space-x-2"
            >
              {isLoading && (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              )}
              <span>{submitText}</span>
            </button>
          </div>
        )}
      </form>
    </Modal>
  )
}

// Image modal for viewing images
interface ImageModalProps {
  isOpen: boolean
  onClose: () => void
  src: string
  alt: string
  title?: string
}

export function ImageModal({
  isOpen,
  onClose,
  src,
  alt,
  title
}: ImageModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="full">
      <div className="p-6 flex items-center justify-center">
        <img
          src={src}
          alt={alt}
          className="max-w-full max-h-full object-contain"
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    </Modal>
  )
}

// Hook for managing modal state
export function useModal() {
  const [isOpen, setIsOpen] = useState(false)

  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)
  const toggleModal = () => setIsOpen(!isOpen)

  return {
    isOpen,
    openModal,
    closeModal,
    toggleModal
  }
}

// Add this import at the top
import { useState } from 'react'