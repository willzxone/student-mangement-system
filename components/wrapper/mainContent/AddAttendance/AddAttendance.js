import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { useRef, useEffect, useState } from "react";
import { RequestForApi } from "../../sideBar/RequestForApi";
import { showMainContent } from "../../../../store/actions/MainContentAction";
import Table from "../TableContent/MainTable";

const AddAttendanceTable = (props) => {
  const dispatch = useDispatch();
  const content = useSelector((state) => state.maincontent.content);
  const [checkValue, setCheckValue] = useState([]);
  const checkboxesRef = useRef([]);
  const selectedDate = useSelector((state) => state.maincontent.selectedDate);
  const selectedList = useSelector((state) => state.maincontent.selectedList);

  const query = `BEGIN UPDATE_ATTENDANCE(:classid, TO_DATE(:date, 'YYYY-MM-DD'),:status,:stdid); END;`;

  const onCheckHandler = (index) => {
    const myCheckbox = checkboxesRef.current[index];
    myCheckbox.checked
      ? (myCheckbox.checked = true)
      : (myCheckbox.checked = false);

    dispatch(
      showMainContent(
        RequestForApi(
          query,
          {
            date: selectedDate,
            classid: selectedList,
            status: myCheckbox.checked ? "PRESENT" : "ABSENT",
            stdid: myCheckbox.name,
          },
          false
        ),
        "SUBMIT ATTENDANCE"
      )
    );
    console.log(myCheckbox.name, myCheckbox.checked);
  };

  useEffect(() => {
    if (content !== undefined) {
      checkboxesRef.current.map((check) => {
        if (check !== null) check.checked = false;
      });
    }
  }, [content]);

  return (
    <>
      <Table
        data={content}
        checkboxesRef={checkboxesRef}
        onCheckHandler={onCheckHandler}
      />
    </>
  );
};

export default AddAttendanceTable;
