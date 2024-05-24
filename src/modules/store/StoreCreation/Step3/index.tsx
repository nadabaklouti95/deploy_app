import React, { useState } from "react";

import { Box, CardContent, Divider } from "@material-ui/core";
import clsx from "clsx";
import AddNewTag from "./AddNewTag";

import Chips from "./Chip";
import InfoView from "app/components/InfoView";
import useStyles from "modules/store/styles";

import GridContainer from "app/components/GridContainer";
import AppsContainer from "app/components/AppsContainer";
import AppsContent from "app/components/AppsContainer/AppsContent";
import { Alert } from "@material-ui/lab";

interface TagsList {
  id: any;
  value: string;
  keyid: any;
}

interface AddTagsPorps {
  data: TagsList[];
  reference: any;
  handleErreur:any;
}

const AddTags: React.FC<AddTagsPorps> = ({handleErreur, data, reference }) => {
  const [tags, setTags] = useState(data);
  const [modtags, setModTags] = useState(false);
  const onAddNewTag = (newTag: string) => {
    let tag: TagsList = {
      value: newTag,
      id:null,
      keyid: null,
    };
    setTags((tags) => tags.concat(tag));
    console.log(tags);
  };
  const modTags = (YN: string) => {
    if (YN === "close") {
      setModTags(false);
    } else {
      setModTags(true);
    }
  };

  const classes = useStyles();

  return (
    <AppsContainer title="Store" fullView>
      <AppsContent style={{height:'100%'}}>
        {reference.current.values.testingformik.map((el: any, idx: number) => {
          return (
            <CardContent key={idx}>
              <Box
                p={2}
                alignItems="flex-start"
                className={clsx(classes.roundedXl)}
                style={{
                  display: "flex",
                  paddingBottom: 0,
                  paddingTop: 0,
                }}
              >
                <GridContainer>
                  <Box
                    p={2}
                    pr={0}
                    alignItems="flex-start"
                    style={{
                      display: "flex",
                    }}
                  >
                    {el.name} &nbsp;&nbsp;{" "}
                  </Box>
                  {el.Cvalue.map((item: any, index: number) => {
                    return (
                      <Chips
                        key={index}
                        onAddNewTag={onAddNewTag}
                        index={index}
                        idx={idx}
                        item={item}
                        reference={reference}
                      />
                    );
                  })}
                  <AddNewTag
                    onAddNewTag={onAddNewTag}
                    index={idx}
                    id={el.id}
                    reference={reference}
                    modtags={modtags}
                    modTags={modTags}
                    checkErreur={handleErreur.action}
                  />
                </GridContainer>
              </Box>
              <Box p={4} alignItems="flex-start">
                <Divider variant="middle" />
              </Box>
            </CardContent>
          );
        })}
        {handleErreur.value.length !== 0 && 
          <div style={{display:'flex',height:'100%',alignItems:'flex-end'}}>
            <Alert severity="error" style={{ width:'100%'}} className={classes.alert}>
              {handleErreur.value}
            </Alert>
          </div>
        }
        <InfoView />
      </AppsContent>
    </AppsContainer>
  );
};

export default AddTags;
