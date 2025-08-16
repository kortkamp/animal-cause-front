
interface ReachBarProps {
  value: number
}

const ReachBar = ({ value }: ReachBarProps) => {

  return (
    <div className="w-full h-1 bg-gray-100 rounded overflow-clip">
      <div className="h-1 bg-primary rounded" style={{ width: `${100 * value}%` }}></div>
    </div>
  )

}

export { ReachBar }