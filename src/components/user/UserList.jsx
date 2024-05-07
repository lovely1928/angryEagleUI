import { useEffect, useMemo, useState } from 'react'
import { Header } from '../common/Header.component'
import Pagination from '../common/Pagination.component'
import { User } from './User'
import axios from 'axios'
import Loader from '../common/Loader.component'
import { AiOutlineSearch } from "react-icons/ai";
import Button from '../common/Button.component'
import { useMatch, useNavigate, useParams } from 'react-router-dom'
import DialogBox from '../common/Dialogue.component'
import { toast } from 'react-toastify'
import { FaSort } from "react-icons/fa"
import { UseCallApi } from '../../hooks/useApiCall'
import { AiFillEdit } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers } from '../../redux/userStore/userReducer'
export default function UserList() {
  const params = useParams()
  let recus = useSelector(state=>state.user)
  console.log('redux',recus)
  // let [users, setUsers] = useState([])
  // // let [total, setTotal] = useState(0)
  // useEffect(()=>{
  //   dispatch(fetchUsers())
  //   console.log('redux',recus)
  // },[])
  let [isLoading, setIsLoading] = useState(true)
  let [skip, setSkip] = useState(0)
  let [deleteDialogue, setDeleteDiaglogue] = useState(false)
  let [userToBeDeleted, setUserToBeDeleted] = useState(null)
  let [sortField, setSortField] = useState('firstName')
  let [sortOrder, setSortOrder] = useState('ASC')
  let [searchField, setSearchField] = useState(null)
  let [pageNumber, setPageNumber] = useState(1)
  const navigate = useNavigate()
  const limit = 7
  let skipHandler = (x) => {
    setSkip(x)
  }
  const query = useMemo(
    () => ({
      sort: sortField,
      order: sortOrder,
      limit: limit,
      search: searchField,
      page: pageNumber
    }), [sortField, sortOrder, limit, searchField, pageNumber]
  )

  // This will help to explain use memo concept 
  // const query ={
  //     sort: sortField,
  //     order: sortOrder,
  //     limit: limit,
  //     search: searchField,
  //     page: pageNumber
  //   }
  const { loading, data, error, message } = UseCallApi({
    url: 'http://localhost:4000/api/user',
    method: 'get',
    query,
  })

  const addUserBtnHandler = () => {
    navigate('create')
  }
  const setCurrentPage = (page) => {
    setPageNumber(page)
  }

  const EditHandler = (id) => {
    navigate('edit/' + id)
  }

  const deleteUserHandler = (id) => {
    setDeleteDiaglogue(true)
    setUserToBeDeleted(id)
  }

  const onCancelDeleteDialogBox = () => {
    setDeleteDiaglogue(false)
  }
  const onClickSortHandler = (field) => {
    setSortField(field)
    setSortOrder((x) => {
      if (x === "ASC") return 'DESC'
      else return 'ASC'
    })
  }


  const onConfirmDeleteDilogBox = async () => {

    setDeleteDiaglogue(false)
    try {

      const resp = await axios.delete('http://localhost:4000/api/user/' + userToBeDeleted)
      if (resp.status !== 201 || resp.status !== 200) {
        console.log('error occured while updating user')
      }
      toast('User deleted')
      // navigate(-1)
    }
    catch (e) {
      toast(e.message)
    }
  }

  const handleSearch = (e) => {
    const search = e.target.value
    setSearchField(search)
    setPageNumber(1)
  }

  return (
    <div className='flex flex-col p-14 w-[1200px]'>
      <div className='flex justify-between border-bottom items-center my-[6px]'>
        <div className='flex'>
          <strong className='text-xl font-bold mr-[12px]'>Users</strong>
          <div className='flex flex-row items-center'>
            <input className='px-2 mx-2 border border-grey border-solid rounded-md shadow-sm' type='text' onChange={handleSearch} placeholder='search user' />
            <AiOutlineSearch size={20} style={{ color: "#000000" }} />
          </div>

        </div>
        <Button text='Add' onClick={addUserBtnHandler} />
      </div>

      {loading ?
        <Loader />
        :
        <>
          <table className='table-auto border-collapse mx-[10px] my-[12px]'>
            <thead>
              <th></th>
              <th>
                <div className='flex items-center gap-1'>
                  <span> Name</span> <FaSort onClick={() => { onClickSortHandler("firstName") }} />
                </div>
              </th>
              <th>
                <div className='flex items-center gap-1'>
                  <span> Email</span> <FaSort onClick={() => { onClickSortHandler('email') }} />
                </div>
              </th>
              <th>
                <div className='flex items-center gap-1'>
                  <span> Phone</span> <FaSort onClick={() => { onClickSortHandler('phone') }} />
                </div>
              </th>
              <th>
                <div className='flex items-center gap-1'>
                  <span> Action</span>
                </div>
              </th>
            </thead>
            <tbody>
              {data.data.map((person) => {
                return (
                  <tr key={person.id}>
                    <td onClick={() => navigate('profile/' + person.id)}><img className="w-10 h-10 rounded-full" alt='user' src={person.profileImage || "/defaultProfile.png"} /></td>
                    <td>{person.firstName + " " + person.lastName}</td>
                    <td>{person.email}</td>
                    <td>{person.phone}</td>
                    <td className='py-2 flex flex-row gap-2'>
                      <Button text='Edit' onClick={() => { EditHandler(person.id) }} />
                      {/* <AiFillEdit style={{ color: '#17a132' }} /> */}
                      <Button color='bg-red-600' onClick={() => { deleteUserHandler(person.id) }} text='Delete' />
                      {/* <AiFillDelete
                        style={{
                          color: '#e81111',
                        }}
                      /> */}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </>
      }
      <Pagination total={data?.totalUsers} itemsPerPage={limit} changeSkip={skipHandler} setCurrentPage2={setCurrentPage} />
      {deleteDialogue && <DialogBox message='Are you confirm to delete this user ? ' onCancel={() => { onCancelDeleteDialogBox() }} onConfirm={onConfirmDeleteDilogBox} />}
    </div>
  )
}
