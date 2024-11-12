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

  return (
    <div className="px-2">
      <div className="border-bottom border-grey flex my-[6px] flex-row justify-between items-center">
        <h1 className="text-xl font-bold">Your Projects</h1>
        <Button text="Add" onClick={() => setShowProjForm((x) => !x)} />
      </div>
      {userProjListLoading ? (
        <h1>....Loading</h1>
      ) : (
        <>
          <table className="table-auto border-collapse mx-[10px] my-[12px] overflow-auto">
            <thead>
              <th>
                <div className="flex items-center gap-1">
                  <span> Title</span>{" "}
                  <FaSort
                    onClick={() => {
                      onClickSortHandler("title");
                    }}
                  />
                </div>
              </th>
              <th>
                <div className="flex items-center gap-1">
                  <span> description</span>{" "}
                  <FaSort
                    onClick={() => {
                      onClickSortHandler("description");
                    }}
                  />
                </div>
              </th>
              <th>
                <div className="flex items-center gap-1">
                  <span> Status</span>{" "}
                  <FaSort
                    onClick={() => {
                      onClickSortHandler("status");
                    }}
                  />
                </div>
              </th>
              <th>
                <div className="flex items-center gap-1">
                  <span> Action</span>
                </div>
              </th>
            </thead>
            <tbody>
              {projList.length === 0 ? (
                <h1>No Project here...</h1>
              ) : (
                projList.map((project) => {
                  return (
                    <tr
                      onClick={() => navigate(`/task/${project.id}`)}
                      className="border-b "
                      key={project.id}
                    >
                      <td>{project.title}</td>
                      <td className="flex flex-wrap">{project.description}</td>
                      <td>
                        {project.isActive === true ? "Active" : "Inactive"}
                      </td>
                      <td className="py-2 flex flex-row gap-2">
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
        </>
      )}
    </div>
  );
};

export default ProjectLayout;
