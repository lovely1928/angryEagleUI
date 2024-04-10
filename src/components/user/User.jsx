export const User = ({ person }) => {


  return (
    <li key={person.id} className="flex justify-between gap-x-6 py-5">
      {/* <div className="flex min-w-0 gap-x-4">
        <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={person.imageUrl} alt="" />
        <div className="min-w-0 flex-auto">
          <p className="text-sm font-semibold leading-6 text-gray-900">{person.firstName + " " + person.lastName}</p>
          <p className="mt-1 truncate text-xs leading-5 text-gray-500">{person.email}</p>
        </div>
      </div>
      <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
        <p className="text-sm leading-6 text-gray-900">{person.phone}</p>
        <img className="w-10 h-10 rounded-full" src="/defaultProfile.png"/>
      </div> */}

    </li>
  )
}