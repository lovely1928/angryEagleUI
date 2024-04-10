export const Header = ({heading,button})=>{
    return (
        <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">{heading}</h1>
          {button ? <button className="bg-gray-800   hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">{button}</button>:''}
        </div>
      </header>
    )
}