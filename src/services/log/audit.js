

export const fetchAuditLogs = async () => {
    const Token = localStorage.getItem('accessToken');
    if (Token) {
        localStorage.clear();
    }
};
