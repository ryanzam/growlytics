export const getPriorityColor = (priority: string) => {
    switch (priority) {
        case 'high': return '#ef4444';
        case 'medium': return '#f59e0b';
        case 'low': return '#09712f';
        default: return '#6b7280';
    }
};

export const getStageColor = (stage: string) => {
    switch (stage.toLowerCase()) {
        case 'tillering':
        case 'flowering': return '#09712f';
        case 'grain filling':
        case 'silking': return '#f59e0b';
        default: return '#3b82f6';
    }
};

export const getAlertColor = (priority: string) => {
    switch (priority) {
        case 'high': return '#ef4444';
        case 'medium': return '#f59e0b';
        case 'low': return '#22c55e';
        default: return '#6b7280';
    }
};

export const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return '#09712f';
    if (confidence >= 60) return '#f59e0b';
    return '#ef4444';
};

export const getTrendColor = (trend: string) => {
    switch (trend) {
        case 'up': return '#09712f';
        case 'down': return '#ef4444';
        default: return '#6b7280';
    }
};

export const getPriceChange = (current: number, previous: number) => {
    const change = current - previous;
    const percentage = ((change / previous) * 100).toFixed(1);
    return { change, percentage };
};