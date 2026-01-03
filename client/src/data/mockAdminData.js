
export const mockKPIs = {
    totalEmployees: 124,
    presentToday: 112,
    leaveRequests: 5,
    payrollProcessed: 98, // Percentage or count
};

export const mockEmployees = [
    { id: 'EMP001', name: 'Raj Kiran', role: 'Senior Engineer', department: 'Engineering', status: 'Active', joinDate: '2024-01-15', email: 'raj@dayflow.com' },
    { id: 'EMP002', name: 'Sarah Jenkins', role: 'Product Manager', department: 'Product', status: 'Active', joinDate: '2023-11-01', email: 'sarah@dayflow.com' },
    { id: 'EMP003', name: 'Mike Ross', role: 'UX Designer', department: 'Design', status: 'On Leave', joinDate: '2024-02-10', email: 'mike@dayflow.com' },
    { id: 'EMP004', name: 'Jessica Pearson', role: 'HR Manager', department: 'HR', status: 'Active', joinDate: '2023-05-20', email: 'jessica@dayflow.com' },
    { id: 'EMP005', name: 'Louis Litt', role: 'Legal Counsel', department: 'Legal', status: 'Inactive', joinDate: '2023-06-15', email: 'louis@dayflow.com' },
];

export const mockAttendance = [
    { id: 1, employee: 'Raj Kiran', date: '2026-01-03', checkIn: '09:00 AM', checkOut: '06:00 PM', status: 'Present' },
    { id: 2, employee: 'Sarah Jenkins', date: '2026-01-03', checkIn: '09:15 AM', checkOut: '06:15 PM', status: 'Present' },
    { id: 3, employee: 'Mike Ross', date: '2026-01-03', checkIn: '-', checkOut: '-', status: 'Absent' },
    { id: 4, employee: 'Jessica Pearson', date: '2026-01-03', checkIn: '08:45 AM', checkOut: '05:45 PM', status: 'Present' },
];

export const mockLeaveRequests = [
    { id: 101, employee: 'Mike Ross', type: 'Sick Leave', startDate: '2026-01-03', endDate: '2026-01-05', days: 3, status: 'Pending', reason: 'Flu' },
    { id: 102, employee: 'Louis Litt', type: 'Casual Leave', startDate: '2026-01-10', endDate: '2026-01-12', days: 3, status: 'Approved', reason: 'Personal' },
    { id: 103, employee: 'Raj Kiran', type: 'Vacation', startDate: '2026-02-01', endDate: '2026-02-10', days: 10, status: 'Rejected', reason: 'Project Deadline' },
];

export const mockPayroll = [
    { id: 201, employee: 'Raj Kiran', salary: '$8,500', deductions: '$500', netPay: '$8,000', status: 'Paid', month: 'December 2025' },
    { id: 202, employee: 'Sarah Jenkins', salary: '$9,200', deductions: '$600', netPay: '$8,600', status: 'Paid', month: 'December 2025' },
    { id: 203, employee: 'Mike Ross', salary: '$7,800', deductions: '$400', netPay: '$7,400', status: 'Pending', month: 'December 2025' },
];

export const recentActivity = [
    { id: 1, type: 'leave', message: 'Mike Ross requested Sick Leave', time: '2 hours ago' },
    { id: 2, type: 'hire', message: 'New employee onboarded: John Doe', time: '5 hours ago' },
    { id: 3, type: 'payroll', message: 'December Payroll processed', time: '1 day ago' },
];
