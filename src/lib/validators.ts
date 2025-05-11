/**
 * Validation utilities for data validation
 * Provides a type-safe approach to validating form data
 */

// Types & Interfaces

/**
 * Validation result containing validation status and any error messages
 */
export interface ValidationResult {
  readonly isValid: boolean;
  readonly errors: Record<string, string>;
}

/**
 * Parameters for creating a validator
 */
export interface ValidatorConfig {
  readonly errorMessage: string;
}

/**
 * Field validator interface for individual field validation
 */
export interface FieldValidator {
  readonly validate: (value: unknown) => boolean;
  readonly errorMessage: string;
}

/**
 * Form field validation configuration
 */
export interface FieldValidation {
  readonly required?: boolean;
  readonly validators?: readonly FieldValidator[];
}

/**
 * Validation schema for an entire form
 */
export type ValidationSchema = Record<string, FieldValidation>;

/**
 * Creates an empty validation result
 * @returns A valid validation result with no errors
 */
export const createEmptyValidationResult = (): ValidationResult => ({
  isValid: true,
  errors: {}
});


/**
 * Common field validator functions
 * Each function returns a FieldValidator for a specific validation rule
 */
export const validators = {
  /**
   * Creates an email validator
   * @param options - Optional configuration
   * @returns Email field validator
   */
  email: (options?: { errorMessage?: string }): FieldValidator => ({
    validate: (value): boolean => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return typeof value === 'string' && emailRegex.test(value);
    },
    errorMessage: options?.errorMessage || 'Please enter a valid email address',
  }),

  /**
   * Creates a phone number validator
   * @param options - Optional configuration for phone validation
   * @returns Phone field validator
   */
  phone: (options?: { errorMessage?: string; countryCode?: string }): FieldValidator => {
    // Country-specific validation could be added here
    const phoneRegex = options?.countryCode === 'ID' 
      ? /^(\+62|62|0)[0-9]{8,12}$/ // Indonesian format
      : /^\+?[0-9\-\s()]{8,15}$/; // Generic format
    
    return {
      validate: (value): boolean => typeof value === 'string' && phoneRegex.test(value),
      errorMessage: options?.errorMessage || 'Please enter a valid phone number',
    };
  },

  /**
   * Creates a minimum string length validator
   * @param min - Minimum character length required
   * @param options - Optional configuration
   * @returns Minimum length field validator
   */
  minLength: (min: number, options?: { errorMessage?: string }): FieldValidator => ({
    validate: (value): boolean => typeof value === 'string' && value.length >= min,
    errorMessage: options?.errorMessage || `Must be at least ${min} characters`,
  }),

  /**
   * Creates a maximum string length validator
   * @param max - Maximum character length allowed
   * @param options - Optional configuration
   * @returns Maximum length field validator
   */
  maxLength: (max: number, options?: { errorMessage?: string }): FieldValidator => ({
    validate: (value): boolean => typeof value === 'string' && value.length <= max,
    errorMessage: options?.errorMessage || `Must be no more than ${max} characters`,
  }),

  /**
   * Creates a number range validator
   * @param min - Minimum allowed value
   * @param max - Maximum allowed value
   * @param options - Optional configuration
   * @returns Number range field validator
   */
  numberRange: (min: number, max: number, options?: { errorMessage?: string }): FieldValidator => ({
    validate: (value): boolean => {
      const num = Number(value);
      return !isNaN(num) && num >= min && num <= max;
    },
    errorMessage: options?.errorMessage || `Must be between ${min} and ${max}`,
  }),
  
  /**
   * Creates a validator that checks if a value exists in a list of allowed values
   * @param allowedValues - Array of permitted values
   * @param options - Optional configuration
   * @returns Allowed values field validator
   */
  oneOf: <T>(allowedValues: readonly T[], options?: { errorMessage?: string }): FieldValidator => ({
    validate: (value): boolean => allowedValues.includes(value as T),
    errorMessage: options?.errorMessage || `Must be one of: ${allowedValues.join(', ')}`,
  }),
};

/**
 * Validate form data against schema
 * @param data - Form data object
 * @param schema - Validation schema
 * @returns Validation result
 */
export const validateForm = (data: Record<string, unknown>, schema: ValidationSchema): ValidationResult => {
  let isValid = true;
  const errors: Record<string, string> = {};

  // Check each field in the schema
  Object.entries(schema).forEach(([fieldName, validation]) => {
    const value = data[fieldName];

    // Required field validation
    if (validation.required && (value === undefined || value === null || value === '')) {
      isValid = false;
      errors[fieldName] = 'This field is required';
      return;
    }

    // Skip further validation if field is not required and empty
    if (!validation.required && (value === undefined || value === null || value === '')) {
      return;
    }

    // Field-specific validations
    if (validation.validators) {
      for (const validator of validation.validators) {
        if (!validator.validate(value)) {
          isValid = false;
          errors[fieldName] = validator.errorMessage;
          break;
        }
      }
    }
  });

  // Return immutable validation result
  return { isValid, errors };
};

/**
 * Validation schemas for different entity types
 */
export const validationSchemas = {
  /**
   * Customer form validation schema
   * @param options - Optional configuration for customer validation
   * @returns A complete validation schema for Customer entities
   */
  customer: (options: { 
    readonly customErrorMessages?: { readonly [key: string]: string } 
  } = {}): ValidationSchema => ({
    name: {
      required: true,
      validators: [
        validators.minLength(3, { 
          errorMessage: options.customErrorMessages?.name || undefined 
        }), 
        validators.maxLength(100)
      ],
    },
    address: {
      required: true,
      validators: [
        validators.minLength(5), 
        validators.maxLength(255)
      ],
    },
    phoneNumber: {
      required: true,
      validators: [
        validators.phone({ countryCode: 'ID' })
      ],
    },
    email: {
      required: true,
      validators: [validators.email()],
    },
    contactPerson: {
      required: true,
      validators: [
        validators.minLength(3), 
        validators.maxLength(100)
      ],
    },
    status: {
      required: true,
      validators: [
        validators.oneOf(['Active', 'Inactive'] as const)
      ],
    },
  }),

  /**
   * Supplier form validation schema
   * @param options - Optional configuration for supplier validation
   * @returns A complete validation schema for Supplier entities
   */
  supplier: (options: { 
    readonly customErrorMessages?: { readonly [key: string]: string } 
  } = {}): ValidationSchema => ({
    name: {
      required: true,
      validators: [
        validators.minLength(3),
        validators.maxLength(100)
      ],
    },
    address: {
      required: true,
      validators: [validators.minLength(5), validators.maxLength(255)],
    },
    phoneNumber: {
      required: true,
      validators: [validators.phone()],
    },
    email: {
      required: true,
      validators: [validators.email()],
    },
    contactPerson: {
      required: true,
      validators: [validators.minLength(3), validators.maxLength(100)],
    },
  }),

  /**
   * Purchase order form validation schema
   */
  purchaseOrder: (): ValidationSchema => ({
    supplier: {
      required: true,
    },
    date: {
      required: true,
    },
  }),
};
