function FavoriteButton({ id, type }) {
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem('favorites') || '[]');
        setLiked(stored.some(item => item.id === id && item.type === type));
    }, [id, type]);

    const toggleFavorite = () => {
        let stored = JSON.parse(localStorage.getItem('favorites') || '[]');
        if (liked) {
            stored = stored.filter(item => !(item.id === id && item.type === type));
        } else {
            stored.push({ id, type });
        }
        localStorage.setItem('favorites', JSON.stringify(stored));
        setLiked(!liked);
    };

    return (
        <button onClick={toggleFavorite}>
            {liked ? '💖 찜됨' : '🤍 찜하기'}
        </button>
    );
}
