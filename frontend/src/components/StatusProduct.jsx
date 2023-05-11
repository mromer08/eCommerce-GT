export default function StatusProduct({status}) {
    const color = {
        accepted: "bg-emerald-400 text-sm p-1 rounded-lg",
        inReview: "bg-amber-400 text-sm p-1 rounded-lg",
        rejected: "bg-rose-400 text-sm p-1 rounded-lg"
    }
  return (
    <span className={color[status] || "sr-only"}>
    {status || "nothing"}
  </span>
  )
}
