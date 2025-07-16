export interface PermissionValidationResult {
    isValid: boolean;
    message?: string;
}

/**
 * Validates permission name format
 * @param name - Permission name to validate
 * @returns Validation result with isValid flag and optional error message
 */
export const validatePermissionName = (name: string): PermissionValidationResult => {
    if (!name.trim()) {
        return {
            isValid: false,
            message: 'Permission name is required'
        };
    }

    // Check if name contains only uppercase letters, numbers, and underscores
    const regex = /^[A-Z0-9_]+$/;
    if (!regex.test(name)) {
        return {
            isValid: false,
            message: 'Permission name must contain only uppercase letters, numbers, and underscores'
        };
    }

    return {
        isValid: true
    };
};

/**
 * Formats permission name to proper format
 * @param value - Raw input value
 * @returns Formatted permission name (uppercase, no spaces, no special chars)
 */
export const formatPermissionName = (value: string): string => {
    return value
        .toUpperCase() // Convert to uppercase
        .replace(/[^A-Z0-9_]/g, '') // Remove any character that's not A-Z, 0-9, or _
        .replace(/\s+/g, '_'); // Replace spaces with underscores (if any remain)
};

/**
 * Validates permission description
 * @param description - Permission description to validate
 * @returns Validation result
 */
export const validatePermissionDescription = (description: string): PermissionValidationResult => {
    // Description is optional, so empty is valid
    if (!description.trim()) {
        return { isValid: true };
    }

    // Check minimum length
    if (description.trim().length < 3) {
        return {
            isValid: false,
            message: 'Description must be at least 3 characters long'
        };
    }

    // Check maximum length
    if (description.length > 500) {
        return {
            isValid: false,
            message: 'Description must not exceed 500 characters'
        };
    }

    return { isValid: true };
};

/**
 * Validates entire permission form
 * @param form - Permission form data
 * @returns Validation result for the entire form
 */
export const validatePermissionForm = (form: { name: string; description: string }): PermissionValidationResult => {
    const nameValidation = validatePermissionName(form.name);
    if (!nameValidation.isValid) {
        return nameValidation;
    }

    const descriptionValidation = validatePermissionDescription(form.description);
    if (!descriptionValidation.isValid) {
        return descriptionValidation;
    }

    return { isValid: true };
};