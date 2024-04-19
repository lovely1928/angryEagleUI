import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { PureComponent, useEffect, useState } from 'react'

const items = [
    { id: 1, title: 'Back End Developer', department: 'Engineering', type: 'Full-time', location: 'Remote' },
    { id: 2, title: 'Front End Developer', department: 'Engineering', type: 'Full-time', location: 'Remote' },
    { id: 3, title: 'User Interface Designer', department: 'Design', type: 'Full-time', location: 'Remote' },
]

const ArrFromNum = (num) => {
    return Array.from({ length: num }, (value, index) => index + 1)
}



export default function Pagination({ total, itemsPerPage, changeSkip, setCurrentPage2 }) {
    const totalPages = total % itemsPerPage === 0 ? total / itemsPerPage : total / itemsPerPage + 1
    const [currentPage, setCurrentPage] = useState(1)
    const [skip, setSkip] = useState(0)
    const [startPoint, setStartPoint] = useState(1)
    const [endPoint, setEndPoint] = useState(itemsPerPage)
    useEffect(() => {
        setSkip((currentPage - 1) * itemsPerPage)
        setStartPoint(skip + 1)
        setEndPoint((current) => {
            return skip + itemsPerPage > total ? total : skip + itemsPerPage
        })
        changeSkip(skip)
        setCurrentPage2(currentPage)
    }, [currentPage, itemsPerPage, skip])
    return (
        <div className="fixed bottom-0 right-0 items-center border-t w-screen border-gray-200 bg-white px-4 py-3 sm:px-6">
            <div className="flex justify-end items-center gap-10">
                <div>
                    <p className="text-sm text-gray-700">
                        Showing <span className="font-medium">{startPoint}</span> to <span className="font-medium">{endPoint}</span> of{' '}
                        <span className="font-medium">{total}</span> results
                    </p>
                </div>
                <nav className="isolate inline-flex rounded-md shadow-sm" aria-label="Pagination">
                    <a
                        href="#"
                        className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                        onClick={() => setCurrentPage(x => x - 1 > 0 ? x - 1 : x)}
                    >
                        <span className="sr-only">Previous</span>
                        <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                    </a>
                    {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
                    {ArrFromNum(totalPages).map((x) => {
                        return (
                            <a
                                href="#"
                                className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                                onClick={() => (setCurrentPage(x))}
                            >
                                {x}
                            </a>
                        )
                    })}
                    <a
                        href="#"
                        className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                        onClick={() => setCurrentPage(x =>x+1>totalPages ? x : x + 1)}
                    >
                        <span className="sr-only">Next</span>
                        <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                    </a>
                </nav>
            </div>
        </div>
    )
}
