import React, { useEffect, useMemo, useState } from "react";
import Button from "../common/Button.component";
import CustomModal from "../common/Modal.component";
import ProjectForm from "./projectForm";
import { UseCallApi } from "../../hooks/useApiCall";
import { useNavigate } from "react-router-dom";
import Thumbnails from "../common/Thumbnails.component";
import { VictoryPie, VictoryTheme } from "victory";
import { FaSort } from "react-icons/fa6";
import Pagination from "../common/Pagination.component";
export const ProjectLayout = () => {
  const [showProjForm, setShowProjForm] = useState(false);
  const [projList, setProjList] = useState([]);
  let [skip, setSkip] = useState(0);
  const navigate = useNavigate();
  let [sortField, setSortField] = useState("title");
  let [sortOrder, setSortOrder] = useState("ASC");
  let [searchField, setSearchField] = useState(null);
  let [pageNumber, setPageNumber] = useState(1);
  const query = useMemo(
    () => ({
      sort: sortField,
      order: sortOrder,
      limit: 10,
      search: searchField,
      page: pageNumber,
    }),
    [sortField, sortOrder, searchField, pageNumber]
  );
  // fetching proj
  const { loading: userProjListLoading, data: projs } = UseCallApi({
    url: "http://localhost:4000/api/project/list",
    method: "get",
    query,
  });

  const setCurrentPage = (page) => {
    setPageNumber(page);
  };

  const EditHandler = (id) => {
    // navigate("edit/" + id);
  };

  const deleteUserHandler = (id) => {
    // setDeleteDiaglogue(true);
    // setUserToBeDeleted(id);
  };

  const onCancelDeleteDialogBox = () => {
    // setDeleteDiaglogue(false);
  };
  const onClickSortHandler = (field) => {
    setSortField(field);
    setSortOrder((x) => {
      if (x === "ASC") return "DESC";
      else return "ASC";
    });
  };
  let skipHandler = (x) => {
    setSkip(x);
  };
  useEffect(() => {
    if (!userProjListLoading) {
      setProjList(() => [
        ...projs.data.map((x) => ({
          id: x.id,
          title: x.title,
          description: x.description,
          stats: x.stats,
          isActive: x.isActive,
        })),
      ]);
    }
  }, [userProjListLoading]);
  const tdClass = "px-4";
  const thClass = "flex items-center justify-center gap-1";
  return (
    <div className="px-2">
      <div className="border-bottom border-grey flex my-[6px] flex-row justify-between items-center">
        <h1 className="text-xl font-bold">Your Projects</h1>
        <Button text="Add" onClick={() => setShowProjForm((x) => !x)} />
      </div>
      {userProjListLoading ? (
        <h1>....Loading</h1>
      ) : (
        <div className="ml-7">
          <table className="table-auto border-collapse mx-[10px] my-[12px] overflow-auto">
            <thead>
              <th>
                <div className={thClass}>
                  <span>Id</span>
                  <FaSort
                    onClick={() => {
                      onClickSortHandler("_id");
                    }}
                  />
                </div>
              </th>
              <th>
                <div className={thClass}>
                  <span>Title</span>
                  <FaSort
                    onClick={() => {
                      onClickSortHandler("title");
                    }}
                  />
                </div>
              </th>
              <th>
                <div className={thClass}>
                  <span>description</span>
                  <FaSort
                    onClick={() => {
                      onClickSortHandler("description");
                    }}
                  />
                </div>
              </th>
              <th>
                <div className={thClass}>
                  <span>Status</span>
                  <FaSort
                    onClick={() => {
                      onClickSortHandler("status");
                    }}
                  />
                </div>
              </th>
              <th>
                <div className={thClass}>
                  <span>Action</span>
                </div>
              </th>
            </thead>
            <tbody>
              {projList.length === 0 ? (
                <h1>No Project here...</h1>
              ) : (
                projList.map((project) => {
                  return (
                    <tr className="border-b " key={project.id}>
                      <td
                        onClick={() => navigate(`/task/${project.id}`)}
                        className={`${tdClass} font-semibold hover:text-red-600`}
                      >
                        {project.id}
                      </td>
                      <td className={tdClass}>{project.title}</td>
                      <td className={tdClass}>{project.description}</td>
                      <td className={tdClass}>
                        {project.isActive === true ? "Active" : "Inactive"}
                      </td>
                      <td className="px-4 py-2 flex flex-row gap-">
                        <Button
                          text="Edit"
                          onClick={() => {
                            EditHandler(project.id);
                          }}
                        />
                        {/* <AiFillEdit style={{ color: '#17a132' }} /> */}
                        <Button
                          color="bg-red-600"
                          onClick={() => {
                            deleteUserHandler(project.id);
                          }}
                          text="Delete"
                        />
                        {/* <AiFillDelete
                          style={{
                            color: '#e81111',
                          }}
                        /> */}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
          <Pagination
            total={projs?.totalProjects}
            itemsPerPage={10}
            changeSkip={skipHandler}
            setCurrentPage2={setCurrentPage}
          />
          <CustomModal
            isOpen={showProjForm}
            customStyles={{
              width: "30%",
              "box-shadow": "2px 2px 7px -3px black",
              margin: "auto",
              height: "auto",
            }}
            onClose2={() => {
              setShowProjForm(false);
            }}
          >
            <ProjectForm setPopupState={setShowProjForm} />
          </CustomModal>
        </div>
      )}
    </div>
  );
};

export default ProjectLayout;
