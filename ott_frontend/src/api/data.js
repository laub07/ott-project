@GetMapping("/data")
public Map<String, String> testConnection() {
    Map<String, String> response = new HashMap<>();
    response.put("message", "연결 성공! 백엔드에서 온 응답입니다.");
    return response;
}
