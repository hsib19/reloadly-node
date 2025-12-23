export interface Operator {
    id: number;
    name: string;
    countryCode: string;
}

export interface TopUpOptions {
    operatorId: number;
    amount: number;
    phoneNumber: string;
}

export interface TopUpResult {
    status: 'pending' | 'success' | 'failed';
    reference?: string;
    deliveredAmount?: number;
}
