const api = {
    login: async (username, password) => {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            throw new Error('로그인에 실패했습니다.');
        }

        return response.json();
    },
};

export default api;
