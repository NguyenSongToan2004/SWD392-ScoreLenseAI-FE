export const getNavigationState = <T>(location: any, key: string): T | null => {
    try {
        return location.state?.[key] || null;
    } catch (error) {
        console.error('Error getting navigation state:', error);
        return null;
    }
};

export const navigateWithState = (navigate: any, path: string, state: Record<string, any>) => {
    try {
        // Create a flattened state object where each key is directly accessible
        const flattenedState: Record<string, any> = {};

        // Process each key-value pair in the state object
        Object.entries(state).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                flattenedState[key] = value;
            }
        });

        // Navigate with the flattened state
        navigate(path, { state: flattenedState });
    } catch (error) {
        console.error('Error navigating with state:', error);
        navigate(path);
    }
};
