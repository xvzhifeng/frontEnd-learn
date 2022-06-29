import React,{useContext, useEffect} from "react";
import GenericTemplate from "components/templates/GenericTemplate";
import ModalDialog from "components/templates/ModelDialog"
import { GlobalContext } from 'context/GlobalState';
import {useHistory } from "react-router-dom";

const AboutPage = () => {
// ダイアログ用のstate
  const {aboutDlgOpen, openAboutDlg, closeAboutDlg} = useContext(GlobalContext);
  const history=useHistory();

  useEffect(()=>{
    openAboutDlg()
  },[])
  const handleAboutOpen= () => {
    history.push("/");
    closeAboutDlg();
  };

  return (
      <GenericTemplate title="Aboutページ">
        <ModalDialog
            title="CRUD Sample"
            open={aboutDlgOpen}
            onClose={() => handleAboutOpen()}>
          <p>Hello, CoE China Modern Web Interest Group</p>
        </ModalDialog>
    </GenericTemplate>
  );
};

export default AboutPage;