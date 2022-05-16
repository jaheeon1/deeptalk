export default function handler(req, res) {
  res.status(404).json({ title: "권한이 없습니다." })
}
