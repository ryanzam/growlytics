export const getPriorityColor = (priority: string) => {
    switch (priority) {
        case 'high': return '#ef4444';
        case 'medium': return '#f59e0b';
        case 'low': return '#22c55e';
        default: return '#6b7280';
    }
};

export const getStageColor = (stage: string) => {
    switch (stage.toLowerCase()) {
        case 'tillering':
        case 'flowering': return '#22c55e';
        case 'grain filling':
        case 'silking': return '#f59e0b';
        default: return '#3b82f6';
    }
};