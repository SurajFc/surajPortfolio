export default function GradientMesh() {
  return (
    <div aria-hidden className="fixed inset-0 -z-10 pointer-events-none" style={{ overflow: 'clip' }}>
      <div className="absolute w-[700px] h-[700px] rounded-full bg-indigo-600/[0.07] dark:bg-indigo-600/[0.12] blur-[100px] animate-mesh1 -top-40 -left-40" />
      <div className="absolute w-[600px] h-[600px] rounded-full bg-purple-600/[0.07] dark:bg-purple-600/[0.10] blur-[100px] animate-mesh2 -bottom-40 -right-40" />
      <div className="absolute w-[500px] h-[500px] rounded-full bg-pink-600/[0.05] dark:bg-pink-600/[0.08] blur-[80px] animate-mesh3 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
    </div>
  )
}
