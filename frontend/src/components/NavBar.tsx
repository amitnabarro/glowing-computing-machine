export default () => {
  return (
    <nav className="flex items-center shadow justify-between h-14 border-b border-gray-100 px-10">
      <div className="text-lg">Drone News</div>
      <input
        id="search"
        name="search"
        className="rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 leading-5 placeholder-gray-500 focus:border-indigo-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
        placeholder="Search"
        type="search"
      />
    </nav>
  )
}
