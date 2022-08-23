import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import { Button } from "react-bootstrap";
import styles from "./AddItem.module.css";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { useSelector, useDispatch } from "react-redux";
import MessageSnackbar from "../MessageSnackbar";
import { Autocomplete } from "@mui/material";
import { getTags, createItem } from "../../actions/itemActions";
import { ITEM_CREATE_CLEAN } from "../../constants/itemConstants";

function AddItem() {
  const [name, setName] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [tagsOptions, setTagsOptions] = useState([]);
  const itemCreate = useSelector((state) => state.itemCreate);
  const dispatch = useDispatch();

  const onTagsChangeHandler = (event, value) => {
    setSelectedTags(value);
  };
  const onChangeNameHandler = (e) => setName(e.target.value);
  const onAddItemHandler = (e) => {
    e.preventDefault();
    let tags = selectedTags;
    dispatch(createItem(name, tags));
  };

  useEffect(() => {
    const tags = async () => {
      const tags = await dispatch(getTags());
      setTagsOptions(tags);
    };
    tags();
  }, [dispatch]);

  useEffect(() => {
    if (itemCreate.success) {
      setTimeout(() => {
        dispatch({ type: ITEM_CREATE_CLEAN });
      }, 5000);
    }
  }, [dispatch, itemCreate.success]);

  return (
    <Container>
      {itemCreate && (
        <MessageSnackbar open={itemCreate.success} message={"Item created."} />
      )}

      <div className={styles.divTitle}>
        <h1 className={styles.title}>Add item</h1>
      </div>
      <Grid>
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                type="text"
                placeholder="Id (generated automatically)"
                label="Id (generated automatically)"
                variant="outlined"
                className={styles.textField}
                disabled
              />
            </Grid>
            <Grid xs={12} sm={6} item>
              <TextField
                placeholder="Enter name"
                label="Name"
                value={name}
                onChange={onChangeNameHandler}
                variant="outlined"
                className={styles.textField}
              />
            </Grid>
            <Grid xs={12} sm={12} item>
              <Autocomplete
                isOptionEqualToValue={(option, value) => option === value}
                multiple
                freeSolo
                id="tags-filled"
                label="Tags"
                className={styles.input}
                options={tagsOptions}
                getOptionLabel={(option) => option || ""}
                onChange={onTagsChangeHandler}
                filterSelectedOptions
                value={selectedTags}
                renderInput={(params) => (
                  <TextField {...params} placeholder="Tags" />
                )}
              />
            </Grid>
            <div className={styles.divButton}>
              <Button
                type="submit"
                variant="warning"
                className={styles.subBtn}
                onClick={onAddItemHandler}
                // disabled={userLogin}
              >
                Add Item
              </Button>
            </div>
          </Grid>
        </form>
      </Grid>
    </Container>
  );
}

//   return (
//     <Container className={styles.addItemCon}>
//       <Grid>
//         <form>
//           <Grid container spacing={1}>
//             <Grid item xs={12} sm={4}>
//               <TextField
//                 type="text"
//                 placeholder="Id (generated automatically)"
//                 label="Id (generated automatically)"
//                 variant="outlined"
//                 className={styles.textField}
//                 disabled
//               />
//             </Grid>
//             <Grid xs={12} sm={4} item>
//               <TextField
//                 placeholder="Enter name"
//                 label="Name"
//                 value={name}
//                 onChange={onChangeNameHandler}
//                 variant="outlined"
//                 className={styles.textField}
//               />
//             </Grid>
//             <Grid xs={12} sm={4} item>
//               <Autocomplete
//                 isOptionEqualToValue={(option, value) => option === value}
//                 multiple
//                 freeSolo
//                 id="tags-filled"
//                 label="Tags"
//                 className={styles.input}
//                 options={tagsOptions}
//                 getOptionLabel={(option) => option || ""}
//                 onChange={onTagsChangeHandler}
//                 filterSelectedOptions
//                 renderInput={(params) => (
//                   <TextField {...params} placeholder="Tags" />
//                 )}
//               />
//             </Grid>
//             <div className={styles.divButton}>
//               <Button
//                 type="submit"
//                 variant="warning"
//                 className={styles.subBtn}
//                 onClick={onAddItemHandler}
//               >
//                 Add Item
//               </Button>
//             </div>
//           </Grid>
//         </form>
//       </Grid>
//     </Container>
//   );
// }

export default AddItem;
