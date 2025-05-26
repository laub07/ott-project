export async function addFavorite({ userId, contentId, contentType }) {
    return await fetch('/api/favorites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, contentId, contentType })
    });
}

export async function removeFavorite({ userId, contentId, contentType }) {
    return await fetch('/api/favorites', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, contentId, contentType })
    });
}

export async function getFavorites(userId) {
    const res = await fetch(`/api/favorites/${userId}`);
    return await res.json();
}
