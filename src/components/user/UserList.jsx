import { useMemo, useState } from "react";
import Pagination from "../common/Pagination.component";
import axios from "axios";
import Loader from "../common/Loader.component";
import { AiFillDelete, AiFillEdit, AiOutlineSearch } from "react-icons/ai";
import Button from "../common/Button.component";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaSort } from "react-icons/fa";
import CustomModal from "../common/Modal.component";
import UserForm from "./UserForm";
import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "../../api/user/user";
import Switcher7 from "../common/Toggle2";
import UpdateUserForm from "./EditUserForm";

export default function UserList() {
  let [skip, setSkip] = useState(0);
  let [showAddUser, setShowAddUesr] = useState(false);
  let [showEditUser, setShowEditUser] = useState(false);
  let [deleteDialogue, setDeleteDiaglogue] = useState(false);
  let [sortField, setSortField] = useState("firstName");
  let [sortOrder, setSortOrder] = useState("ASC");
  let [searchField, setSearchField] = useState(null);
  let [pageNumber, setPageNumber] = useState(1);
  const navigate = useNavigate();
  const limit = 7;
  let skipHandler = (x) => {
    setSkip(x);
  };
  const query = useMemo(
    () => ({
      sort: sortField,
      order: sortOrder,
      limit: limit,
      search: searchField,
      page: pageNumber,
      skip,
    }),
    [sortField, sortOrder, limit, skip, searchField, pageNumber]
  );
  const { status, data, error } = useQuery({
    queryKey: ["users"],
    queryFn: () => {
      return fetchUsers(query);
    },
  });

  if (error) {
    console.log("error in userlist ", error);
  }

  const setCurrentPage = (page) => {
    setPageNumber(page);
  };

  const EditHandler = (id) => {
    setShowEditUser((x) => !x);
  };

  const deleteUserHandler = (id) => {
    setDeleteDiaglogue(true);
  };

  const onClickSortHandler = (field) => {
    setSortField(field);
    setSortOrder((x) => {
      if (x === "ASC") return "DESC";
      else return "ASC";
    });
  };

  const onConfirmDeleteDilogBox = async (id) => {
    setDeleteDiaglogue(false);
    try {
      const resp = await axios.delete("http://localhost:4000/api/user/" + id);
      if (resp.status !== 201 || resp.status !== 200) {
        console.log("error occured while updating user");
      }
      toast.success("User deleted");
      // navigate(-1)
    } catch (e) {
      toast.error(e.message);
    }
  };

  const handleSearch = (e) => {
    const search = e.target.value;
    setSearchField(search);
    setPageNumber(1);
  };

  return (
    <div className="flex flex-col px-14 ">
      <div className="flex justify-between border-bottom items-center my-[6px]">
        <div className="flex">
          <strong className="text-xl font-bold mr-[12px]">Users</strong>
          <div className="flex flex-row items-center">
            <input
              className="px-2 mx-2 border border-grey border-solid rounded-md shadow-sm"
              type="text"
              onChange={handleSearch}
              placeholder="search user"
            />
            <AiOutlineSearch size={20} style={{ color: "#000000" }} />
          </div>
        </div>
        <Button text="Add" onClick={() => setShowAddUesr(() => !showAddUser)} />
      </div>

      {status === "pending" ? (
        <Loader />
      ) : (
        <>
          <table className="table-auto w-[80%] m-auto border-collapse mx-[10px] my-[12px] overflow-auto">
            <thead className="my-4">
              <th>
                <div className="flex items-center gap-1">
                  <span> Name</span>{" "}
                  <FaSort
                    onClick={() => {
                      onClickSortHandler("firstName");
                    }}
                  />
                </div>
              </th>
              <th>
                <div className="flex items-center gap-1">
                  <span> Phone</span>{" "}
                  <FaSort
                    onClick={() => {
                      onClickSortHandler("phone");
                    }}
                  />
                </div>
              </th>
              <th>
                <div className="flex items-center gap-1">
                  <span> Status</span>
                </div>
              </th>
              <th>
                <div className="flex items-center gap-1">
                  <span> Action</span>
                </div>
              </th>
            </thead>
            <tbody>
              {status === "success" ? (
                data.data.data.map((person) => {
                  return (
                    <tr className="border-b" key={person.id}>
                      <td
                        className="flex items-center gap-2"
                        onClick={() => navigate("profile/" + person.id)}
                      >
                        <img
                          className="w-10 h-10 rounded-full shadow-md"
                          alt="user"
                          src={person.profileImage || "/defaultProfile.png"}
                        />
                        <div className="flex flex-col">
                          <p className="font-semibold">
                            {" "}
                            {person.firstName + " " + person.lastName}
                          </p>
                          <p className="text-sm">{person.email}</p>
                        </div>
                      </td>
                      <td>{person.phone}</td>
                      <td>
                        <Switcher7
                          isCheckedDefault={person.isActive}
                          // handleChange={() => console.log("click")}
                        />
                      </td>
                      <td className="py-2 flex flex-row gap-2">
                        <AiFillEdit
                          size={22}
                          onClick={() => {
                            EditHandler(person.id);
                          }}
                          style={{ color: "#17a132" }}
                        />
                        <AiFillDelete
                          size={22}
                          onClick={() => {
                            deleteUserHandler(person.id);
                          }}
                          style={{
                            color: "#e81111",
                          }}
                        />
                        <CustomModal
                          isOpen={showAddUser}
                          customStyles={{
                            width: "30%",
                            "box-shadow": "2px 2px 7px -3px black",
                            margin: "auto",
                            height: "auto",
                          }}
                          onClose2={() => {
                            setShowAddUesr(false);
                          }}
                        >
                          <UserForm setPopUpState={setShowAddUesr} />
                        </CustomModal>
                        <CustomModal
                          isOpen={showEditUser}
                          customStyles={{
                            width: "30%",
                            "box-shadow": "2px 2px 7px -3px black",
                            margin: "auto",
                            height: "auto",
                          }}
                          onClose2={() => {
                            setShowEditUser(false);
                          }}
                        >
                          <UpdateUserForm
                            id={person.id}
                            setPopUpState={setShowEditUser}
                          />
                        </CustomModal>
                        <CustomModal
                          isOpen={deleteDialogue}
                          customStyles={{
                            width: "40%",
                            padding: "15px 13px",
                            "box-shadow": "2px 2px 7px -3px black",
                            // margin: "auto",
                            height: "110px",
                            overflow: "unset",
                          }}
                          onClose2={() => {
                            setDeleteDiaglogue(false);
                          }}
                        >
                          <div className="flex flex-col gap-2">
                            <p>Are you confirm to delete this user ?</p>
                            <div className="flex justify-end">
                              <Button
                                text={"Confirm"}
                                onClick={() =>
                                  onConfirmDeleteDilogBox(person.id)
                                }
                              />
                              <Button
                                color="bg-red-600"
                                text={"Cancel"}
                                onClick={() => setDeleteDiaglogue(false)}
                              />
                            </div>
                          </div>
                        </CustomModal>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <p>No data found</p>
              )}
            </tbody>
          </table>
        </>
      )}
      <Pagination
        total={data?.totalUsers}
        itemsPerPage={limit}
        changeSkip={skipHandler}
        setCurrentPage2={setCurrentPage}
      />
    </div>
  );
}
