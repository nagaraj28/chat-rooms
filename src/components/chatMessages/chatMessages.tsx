import React, {useEffect, useState,useContext} from 'react';
import { handleSendMessage } from '../chatwindow/chatWindowUtil';
import { ChatRoomInterface } from './chatMessageInterface';
import axios from 'axios';
import { performClearRoomNotifications } from '../chatwindow/chatWindowUtil';
import "./chatMessages.css";

const ChatMessages: React.FC<ChatRoomInterface> = ({currentroom,socket}):JSX.Element=>{

    const emptyArr:any[] = [];
    const [currentMessagesStore,setCurrentMessagesStore] = useState(emptyArr);
    const [typedText,setTypedText] = useState("");
    const [dbMessages,setDbMessages] = useState(emptyArr);
   
    useEffect(()=>{
        if(currentroom.messagecount>0){
            performClearRoomNotifications(currentroom.roomid,"admin");
        }
    axios.get(`http://localhost:5000/messages/${currentroom.roomid}`).then((res:any)=>{
        setDbMessages(res.data.messages);
    });
    setCurrentMessagesStore(emptyArr);    
    const perFormMsgMerge  = (msg:any)=>{
        setCurrentMessagesStore((prevState:any[])=>[...prevState,msg]);
        }
        socket.on(currentroom.roomid,(msg:any)=>{
            perFormMsgMerge(msg);
        });
    return ()=>{
        socket.off(currentroom.roomid);
        setCurrentMessagesStore(emptyArr);    
    }
    },[currentroom.roomid]);
   
    // useEffect(()=>{
    //     console.log("updating",currentroom.messagecount);
    //     if(currentroom.messagecount>0){
    //         performClearRoomNotifications(currentroom.roomid,"admin");
    //     }
    //     do{
    //         performClearRoomNotifications(currentroom.roomid,"admin");
    //     }while(currentroom.messagecount>0)
    // });


    const getTime = (date:any):string=>{
        var created_date = new Date(date);
        const amORpm = created_date.getHours()>=12?"PM":"AM";
        const hours = created_date.getHours()===0?"12":created_date.getHours()>12?created_date.getHours()-12:created_date.getHours();
        return hours+":"+created_date.getMinutes()+" "+amORpm;
    }

    return (
    <div className="chat-window">
        {
        <div className="chatmsgctnr">
        <ul>
        {
           dbMessages&&dbMessages.map((eachMessage:any,index:number)=><li className='msg-head-ctnr'   key={`${eachMessage.createdAt}${index}`}>
                  <div className='img-ctnr'>
                <img width="50" height="50" src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUTExMWFRUWGRgVFhcVFRUVFhgXGBYXFxcYFRcYHSggGB0lHRUVITEiJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGxAQGi0mICUtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAOUA3AMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAFAAIDBAYHAQj/xAA/EAABAgQEAwUGBAQFBQEAAAABAAIDBBEhBRIxQVFhcQYTIjKBkaGxwdHwQlJy4RQjYrIHQ4LS8RUzc5LCY//EABoBAAIDAQEAAAAAAAAAAAAAAAMEAQIFAAb/xAAxEQABBAAFAQYFBAMBAAAAAAABAAIDEQQSITFB8BNRYXGB0QUiobHhMpHB8RQjQnL/2gAMAwEAAhEDEQA/AOSuKIS8HI2p8x9w+qikoH4z6czx6BKajLVjGQZzvx79eazHkuOUKCI9QJE1TwEq91phjaTobK2V6BBrRo9eabChZRzPuC1nY3Bu8iNJ0FDomoIOXevgEvNLwP7K0/YXs/RoeQK69L0Rbt3jH8PL923zvsPmfSyPwSyBCzE0a0VJOw1XIccxIzUd8U1obMbXRgNj98Uwy5H2BoNkOYiOPKTqd0DYOIrW3PVRvlSKvNKVA141oKehRGA3K7MQLbKCdgmxJFDe23VEfH8qVbJ81IYdz7AvIEm6I4NGpuTsBxT6FzqNFb0A4lGXwRAh5dXu8x+Q5IMcQfqdhv14o0kxjAA/UdkDiyAhvs7NteyUWCQyG6lA55AJ32p0TnuqU2YNQBQHLUjiCKWPt05pWQDXKKCchJ/61KfOSxDntLct9ORv62XjsJpDzsdmp5hS9OITori69vTbanoreGTWU8t0WFkbnU70Pcgzve0Wz+0OYNtjopoMLNRm5IArQVrzOiuYth2Q52eR2n9J4KtBGYcwiGMsdlchtkD25m/0pIULKLiutPUI32PxYy0w0nyuoHcjx+PtVYw8rS00JNDXhY296hZC4jTdMiKq680t2t2V2nFJER4exBFeI0quMdpMKMKIaeh966P/AIdY7nhmXefEzykmuZmxHT6KXtngwiMcRqKHT4JdoomN3onXHM3tG+q4nHh/iHqOCrOCMTcDI6ntQ+Yg5TyNwUpNEWm0eKQOCghuV+VeNDcHUIc4KSDEURSUVEjLCkmpfIeRuDyUSJAB7cp9DwPFDYrS0kcFeRmXUbH6eCqx2bQ7ovPRABQbaIS91VJMxaqABdiJczlMMeUapNCISEEeZ2g0HEqOTlS88hcnkrlK0AXQRX85GnHiunlr5QdefBTyMuYkQb1K7P2TwsQ2CyxXYrCCXBxHPTZb7F8VbKwHPNBQW5uOgTM1gBjdygwVq92wWY/xHxitJaGabxKcNm+uqw0rDofmrH8WIrnRCS81uTZuY8OKY40GZxAH3onoo2saKPqs6aZ0jjY64XkwwCqET8eunRTzk6X7UboBpXmV5gsjnJiRB4Gm3M8OiDI7tHZGc9WiRtETc7+FcwmWEJnev8xHhB2HHqUMnJovJ5/BW8Vmi80rZR4fhuYF76thjU7nk3iVSZwrs2bD6+KvC02ZH7n6eASwrDHRSaUa0eZ7rNaPmeSuwMPkmVFXxTepz5Aa8CNLgDfVC8UnXHwN8LG6MHz4lUYL4lDUECxrTgQfT1SDntHC0WxuI1NeS0UPB4D6iA9zXkklsTQn+k7V9UHjy7oTyHAgjUFVnPeHE0NNj+4R6UnBHYIUazv8t5uQeFdS3l7FaNzTpVKkjHDW7Cfhcy17TCfcFDJyVMKJQ+h4jinPlnwn5XChF+RHEHcI21jY8PKfMPKef0Wi0dq3Kf1Db2WY49i/MP0nf391TlnZgOIVl8IBvyQqXDmuLTYg06InCmc/hdQO9x6c0SJ4Io7oczCDY2TcOjvgxWxGE1aa04jceq7NKR2TEAPbcOFVx4M2cK8NitJ2B7QtZEMAus42DrEPGo9ULFQ22xv1aawk5zUdj0EM7cYPkcXAan7useGAtLHdWngfou29ppIRIZIF6VXH8WkzDea7IQp7M3oUZ7Sx9DzCzsWGQaFR0RiLL5waagVpxG6FOas+WMxu8E5G8PHjyrErFoUZEJj7kCuizrTdXYcwaJnDzZRRS80VmwqZunwodSmsajmCSlXFx8rLnrsPml4YnTPDQjyyNhYXFSzEPuoTWfid4nffKylwSQzvHNV5hxiRK7bdFuOyeGUAcbaGq03Vdj9I0HkPdIRh1a7nU+q1OCwBChjkFzzt7j/fxe6afBDNDTd259NPatP21x3+HgENPjd4W9dz6Lk8u/jr8UqXfN4lMu2obBHP+oNaBDgs0/E/40G/qoYodEPiNQPugUUJlP1FWoUHMQxvqeX7pslz9D+3Hks+ms1H7nU+JTJSTMR3Bo35K3iM4AMjbAWVicithMyN13QN9XGm5NArSHshlG53VI/9pDjsNvdEsFw7vnFzzSEzzEauJ0Y3mfcE3tDjgDu6gtBItbysH5W8+aIYqDBhNgMNCB43DYnzEczoOAA4rHxJpkMUbQnlf3m5SM8mUVt4+y0MPHmOY+g901jXnU/X2BKzfMag1FCQBfkHV9ypzGJOdrpz/ZVXRgfsrPLwNlohp5RfK2lW1ZyJqPQi4HVOhTD260c32/8ACDwZmllbgTDDrVp4i/tClr1BYtpKvbMwgyvjb/2ydf0E71VOVjFp4EaodIRnMPeMo8DXL9NkaxYNcWx2eWKK9HjzA/H1WpDISPELJnjDXeB+6tTUERmh7fMNef7oY6DW2jgpcPmch5K7iMtUd4z1A96dIDxm55We0mJ2Tjj2Q5s+9guMwGoOvoVBOTbC5sWHma/U6baEFSvP4tjr9VRmIdOh0QHveG1en27im42szXWv37xS7D2Xx0TUAE+byvHBw+wfVZrtlhdSXALI9jcbMvMCppDf4Xcj+E/fFdTn4Yiw/el43C74KecLFchcfhEw3g8CvMclA12Zos6/TiimPyOV5UcBvewjDPmbdvy+iP2XaMMfO48+71CW7Ts3iTjY+X4WXcEsynjQ6ffuVeiyNQVp6HUK3ChGoA1NgOq0ExSFDENvqeJOp++Cq4LB80Z21Q3rufknMrEfUrXgYIo75d9vysyZ5lkrgffhX8CkMzhVdDhPbBhVNqDdB+z0iGtzFCO3OMkDuWG7h4uiq6vQIoNDRZvtFihmYxd+EeFvTiqUhAvmOm31UcJlTT29ERhw67Wb8UNjS52Y9f0qyPytrropMB11cbAddAjMOCIDLmrzqUPw6Hmd3h8rbN5u4p09MVPFOx/K3P8At7+qz5be7Jxz7e6qTMUuPFX+zcoC8xn0EOA0xDWwqPKCdrkegKpQYRecoFyrXbeL/Dy0KWYaGKe9icSxtmA8i4uP+gJWU5WGQ8fdNRjO8RDnfwCzuPY4YrjlJDakk6OefzHgOAQAvXpuVK2GsVzi82Vuta1goKuQvKKyYSZ3apStmUQCkaVM2Ek6CpDSozBPlJpzDVrqFbbs+4TMKJDaKPA7zKNBEaKktHBzc1uICwRbRGuy2JGBMwogNszWO5scaOr6FM4eUscAdktioQ9hPKL1oUVw6b2NwdVc7UYQYby4DrQc6VQKE6hW20mNywnASNo7/Yq1PyfdmovDfpyPD1Q98MEFp9EZLREhlhPMcjshLQSC02c009QukaAdNj0Quhea1Oo6B90K7ogkHUfdV0rsPjveM7t58TbX1I2Kwc1DqMwFxqPkm4bPOgxBEaeR5hJhoaaOy0A/Nqug9qcPzXCwrCYb6rpsvHbHhA1qCPisR2gkMrijNseYVZAHDzQfG5cVEQeV+v6uPr8kJLEfkiHtdCduLcunxQZ4cwlp1BohYyNrql4P3VsJIW3Gdx9kXxCIAGw26CyJYFIVIJQqVhF76nitjh0MMaCmHHM6+vBDjZkbSuT882BCJJ0FVzSZmHRHl7tXHT4BFe1GJGI/ux5Wm/M/shkqz8R9Pql3fMaRCaFlWJWDsNTr8z0Cutg5j3bbD8R4D6lMhMLRpVztvgPmf2RIMEJlNXG7jxTccYrX19lnyy66b8e/ooJuIGjK2wFghgFVNENSjvZzCc7g522g4lc4GR3goBEbb5+6K9jsAuHPF6VPQ6BYb/FGPmxCK3aG2HDHowOPveV2KYitlJck609SSuI9tATNRHn/ADBDif8AtDZ86pHG25lj9INBaGBpkmV36iLP009LWchhavspgsOZJaYgY6nhDtHcq7FZQWKvSc2WGoKQge1r7cLCexkb3xkRmjwVru0PYx8CGYli0akbdVi3Nuis3j8aI3K57yOBJog7nomJfE4/IgYGPEMZUzgT3haXsvgLpl1G7CpJ0A5ozj3ZVkvCL3xGZvwtBqT9AsphmMPg3Y4joaJYhjT4vmcT1NUdk0DY6rXySsuGxbsQHB9M7q1PXghkcXKdAGnoo3FWpOHVzRzHxSLdXLXdo1fQcaWbMyzXC5c0V9QKj2rmGLYcYLyNjdv0K2XY/Gg2IYLrNcTl4VG3KtFe7V4O11TpW4OwK3Wij2Z9PZeecczBMBrs4eHB68lzaUjEHkrs3L5h3jR4hqOI+oVePAoSCNFYko1EZg/5cgvOz2qlFh2zD16cULmIdDyPxWgmoGQ5h5HewE7dCh0xCAqNjp98QhTRddd6Ygl566CKdjMXynuXG2rfmFoMalw9uZc5BcxwINC01BW+wfEBGhA8bEcDugxnhOlZGZhmG/1VuLIw41HuBrQD2K7jkncoLCiuaKI8bw3QiwlpWE0QjmCSu5U+O4gITDTXQdVMHBjVkMWnDFiW0HhaOPP1Qnuyi+UwBwq0Fhcb9XH74opKQq+KlhpzP0CilJWpDG6nU/E9AEe/hQ0Bv4W8d/8AnUq+Hhvrr1/KUxM4GnXXATJSHlHeO1Pl6cfVUZqNmKnnZuuihk4BceqNI4foalWCre5W8MkDEcKDr9F0XA5EMaCQLBBMAkaU+6oxjc6GQ8jdTb03Kq8H9A53UxOAud+w2CD9o5wxn5R5W2HM7lYTtvJUMJ/GGWHrDcSPc8exbKAN0F7Wwc8Bx3YRE/8Ak/3e5dPCDCQOOvslsLinf5QceTr69BcxiBND1PMtuqhXm3aFeybqLTzERDCcNMcuOYNawVNa1O5DbUzUB1QslamRa6DLgGxiEGnW1TwtZQPFXAQPEoHdxXMBqBSh5EA676qsXIr2jlyHMfWoc3XmD+/uQZcTquIUzStH2TlQ+Oyujf5h/wBNx76D1WdhBbTslBoxz/zEMHQXPvI9icwTM0otZ/xGTJA7x0/fRaCYli12cWvWo2OxW8wifEzAo6mcWd14+uqyMMkspryO69wacMGKDsbO6cfRbs0YcLG+4XnMJiix1O22Pkn9osKuSBcLMOhkLqWJQg9tQsTiUhQk0VWnOL5RJP8AS6v+TsqUs8ObldobKjMyxFWHq0/A/IqcNLSrNQ/qNPoi1mFFDDshsbLMTEOo08Q2+IU2BTvdvpXwu9x2RPFJSg7wD9XwB+XsQGah0NRofcUhKwsdfctSCUPb1+y3MZgez0WXmYBDiKIngc/naAdRY8+BVuLLgmquDyEar3QrHpygoDc29N0FlIVPEfTpxXsZxivJOny2CL4RKB7qnyM9hOzfT6KjGmR+noqTyhjST14K9hEpkbnd5ne4bD5qGfmtgp8SnKWCEDxFOyOEbcjVmRML3GR6cxtStLg8gbcT8FUwrD/xEW2HEozN4lDlIfePuTZjNC93yA3PzQx/rbnKhxM8gjb6rSysIQ21pfcC6ATkN73F7gGg6Bzmig2FysjNdopiY80Uhv5IfgZ0oLu9aqpDjWPiugxzC7TOJwxcA0aALZxpyDDFC4uPBlP7jb2VWc7RY20w8jGAB4oXF2Z19hsPYgsXFiKggGnEINPz5eeFOGiFiMWMtAq2E+GhrgSFWmLqg4q1nqogw5hTiPisZ5vVeiYKFI7gOAZ3AvDnus7uodK02MR58LB19y1kYQnMIfCgx8hr3cAubGY1u5iD/uaEnUoLKxIsZvdwnQ4MNvmLnZA925cQC57jbawoLCiINk/4dg7magiYFzke8OeTbIxzmAUHA0B3UbIwCHYsJOPDDYTokIi7RFpEbXgHNuBfeqxsRhBIOoJB9FtDHgRrR2mFFreIxtL/AP6MGvsrzCzuNw2iIACC4CjyPKSPK5vVtFxVSK1VSCtH2bxIsOXVupBFfZwWaLlNKxy01Hv0RYZDG4EJaeISNLSLXWpOeln0yuc0no8e41CsTGHEnMwtd0cPgVzRuLvcAK3V1sbKB4jU8CthmMsLAf8ADADYXWcDjODe7e020J4fsm4nKDhZc7k8ZiwaObEcKc6/Fb3s9jzJyGRZsVou3Zw/M35jZWEozZguOHd2fZv9D/CzU/L0PwQzvcpWtxKVrUHffgVkp+GQaHUJlxr5gkYLJLHInLRQ4UNwdlnsSksjiw6G4PEfUKxJzOU0RSZhCNDp+IXaefD1VnATMvlEaTh5L/5PV9cLKScYw33PI9OK1cOaFFl5qFUaeIVt8QppLFC1gB206LPBymrWy13K8lZc+FjbuJ9+56BH4r2wmBjdvedyq+HQu7Z3jvM4W5M29TqqU3GqU8wdkzNzx4BZbyZn1wPqfwmRH5iiWDyOd1/KLn9uaoysEkgbla+QlQ1oaPU/FUjbmOYoeKm7MBrdyrLHNY0xHWYwV6AbDnt1K5d2mxJ8d5iOOtg3Zrdmj7uala7tpi2Wks3k6Ife1vz9iwuLUpwNfuo4pDHSZtBwtP4XAI2gncqbDJmjaJGaIchcnFoVJNvukRIQ0LTdEMyfOxqmqqOcmvem1QXOzFFYzKEiVZkAXRGACpzDXlep6Uqqq0HZuUp/MO4Ib039qqiKtGLwQ0CnzvWquSck8nNEOQC+lXHpXTqrkWaMJ9Qail6aINO4g5zia6qyklEJmBDiurDiOa4gV72lCaCviaLezRCsWGUtafOAQ6lxTVhB3qCfcvZdrjodV7iMs7I15AsSDxoaUr619qiipuwhq9Dl4mqFRXpKLQ1V0x8zwg7H0RCROhRWOOyC9g3V3EI9G09Fa7PTrmEPa4tc01aRxQLEI9SrWFTGUEDUn7HLqjMlqRDlhDo12uBMCYgNigUzeYcHCx9/xWfxaSztt5m+8cOqB9ie0BZG7lx/lxTTk1/4SOpsfTgtlOQqGq2cO8PFLzmNidE4SDcLn8VtCrcjOUKu45JUOcCx15FA9CosxvRmFs0dojjED/NboaB/I7P+SCRJMuNRv8UfkJkEZXXBFD0Q6bgOhuLakjVpG7dq/D0Vp42u+YDQ/dTh3lnyE7d/d+FZnZskqtCbVRh1SiOHwKuA46fVVJMjlJAjYimCylPEdUeBENj4rhUMaX9corT74qCUh6NGg1UPbfEBBlCz8UXwActXH2CnqiTP7NlLPwsZnlzn0XNMTmXOe5zjVziXOPMmpQ+dmM1OisYs4HK8aOFD1H37kKe5eflebIXroY9ASkx1Cp5h1Qqykc6yADoj1rajXq8CL4DgcSZe1oFGk0qbV6E29VylVcNkTFdYHKNSPgtVEAhMA5WHAIiTCkTkyguA1Nco6ceqy2JTDojjfVWAtcabuo5mZrohzbk8dR8/r6K5FhZGVdv5Rx59EOoQa76hXc0sq0Jr84KIybqBGpKK17XMcBRwoh2GhsQFos43A/rGobyI22ICdBGQ+IEURHQktDhshtnAcWlC8Rw98F2VwtseKplb2WiMmgYcXTY79a8Vk8Zwt0B5FczK+F4oQetNClkzXKGq4x9B6KmpYrlINKrhajc6pU8vEpWnBV160qAVJGiKSbiSKa1XZpGZEeXhxPxOaCf1CzveCuM4a4Na55/S3rut5/hvitWPgnVpzN/S7X2H+5aeDfRA71lY6MZSePdHJqBUFp3WPnJfK4hbudbus9jcAEZ/b8itZ7c7bXn4HGGUsOxWchxC0ovLz5yoPGbQpgiFAjmMei0nxNk1KsSrRqdBqtJhkGgz0oSAANwEKw6WzH+lt+pWjkWVPRFiGUWUli35nZAishA0tUk+/Zcv7c4x30w6hqyH4G86eY+p9wC3vanEO4lnEGjj4W9Tv6Cp9FyCMNyaBZ+OlNZQtT4bCBr3aJQImYOYdDoeB2VMqURRtYJkfWvFZJW2NExOaK2T4MvUVJoPb7kqgWH/ACurvU2EQwqQY4lzzUNp4eJ+nxRmexAUAaKAaUtenJZ2Rj5XHgfjt8SiEtDL3AUqSrMZmNBVc8MbZV2XbGmXAGppYdFYjQoMvXMe9iflHkb/AOR2/QI5CiCXgHLQPcCxvHNS5HJo95Cy8th74mi2m4cRABotxWH/AJDsS5znmmDTz79dwPLXxQ2civivLna+4DYAbBOjSpo002+BKPw+z7+CJPwd2RopxUs+HOdZfujOx8baDSKWHZCINlqcMcI/8t9O8pUH84/3/FOOAO4Lz/o8RtHCxbcEctFaHCPiO1hDnxEUw0dR4KGT0o6E61QEQlJpj4fdvFQdao5NQ2xoYcQA7Rw/rGvt19VjJv8AluoEnjsJkOZuxTPw/GGQZXbhVcawkwXeE5mE2OpHI/VDXOqr8/PF9GjQXPM/sqT2V01WWtSwok9jakAbprm0sU+AaXXBcVbjv0aPKLD6lXsBnzAjMiDQGjubDr98kJEa6tsobi3L6I0biHZhwl5mBzMrtjou05s8PMNLCvMiw9xQqO3Vp0KG9j8SMSE2G43hnKDQVynyV47j/SjU7CtUL0UTwQCOV5PEMNkHdu6ys/AoclLgWOxHAcwhVFqZ6W7xv9QuOqBmCDckA7jmgys1TmGmtvXWq0UrAytDR69UbkIeUKjIwqmqJTEQNaehJ6bo7tdAs9rsoLysF2/n88ZsMHwQxU/rff8Atp7VjDQ6o1i7i5znnVxJ9qAvF6LCxTreSvT4FmWINv8Avn6prsiXdg/RODAOZ+CaDdKJ5Oc+1FAU4pjlxNqwFL0LV9lYjK+MltNTQEU1410B2WZgws3Ec6WRmcywoYgwqlz2B8R5FDRwrkA2qKehpuU1hSWHtOAk8YBI3shufp3m9k+dxEx43eaMHght/LD2txOp5lb/ALCz+WsEmgJqP1fv9Fy6TfQ3Wpw6Yyua4FaOCd2l5tysv4lhGuh7IChWnpt1yuuVSqqmGTgiww7fQ9VaRyCDRXgXMyktI1C9qquITghQ3PO2nM7KysX2xxSvgBs23U7lWjZmPgmcHhu3lDa05Wdgz7okZ7K3fUgnd4qfqsri0wXPOysvjFrw9poWmoPAi6sY3BZFhNmIYDSah7eD96crg+qTxLzJGQNxr6fhe+hjbDK3TQ6DwP5GyzxXgKYvQscrXU0bxKNrqahOC8IqoOq4aL0RRwVhjwqZhkKxB1V2k2qPApajsvMZIreD/AfXT309q6NDIcFyuTPNdHw2bzNa78wFfn71uYM2zKvMfEfklEnB0PXl9lHHhZT7kNmcKzuzAC60MdtQheVOaOGqSNsNtReTh5W39UNx+Me6dTcgHkD909VciRNvakIYdVrhVpseiqRofFAfLT29w1XMsSQiJZGsVbRzhwJHsNEDirCxGhXr8N+lQOKZmukSmlJp8Bekp8OGXaaqMKxLQS9wY3U8dBxJ4AaqQLNKHaC0VkcOa1vfTBpCabNr44jtQwDbTVUIk2YkV73WLyTQaAbAcgKD0TsSmWmkKHeHDrfd7zTNEPWlBwACHwjdGkeAQ1uw+p51+g/fnVeGNzgXv3Ow7h5d53P7cK1DdQoxh0zQZTpsgrxurMtERsLJkeomYHtXS+yeK5HBpNjY/IrcLi8lOlpC6d2cxVsWFcirBev5OPotp5DxmG/K8T8ZwRYe1A81axueEKGTW5sPmVy3GJ2pKL9q8c7x5obCw6LIPeXOVXydmzKNytT4TgDEzM/c6qOM63XVey88GtLH1LHGppq0iwezjaxG4VWZiXKqxTosSWYh2i9G2IObTlYmpQtJIo5uocNKH4dCqpRVgESCGi0Rl/1Q/qPohb2EIUjQKLdj1XoixvJsO3B6PqkwpApicEJFUrSpIY4KBpU0MqwVHeCJyrqrdYAwtgtrvUjoTb6+qwUkKuA2JA966lHhUAptb2LYwAu3d3X8Lzfxd+XKzvs/t/asS8SoI4fBUZmB4ikyJQqyX8BZaPNrNjdplPCfNS7ob3MdqD9lTSwB9LnpxCM4jCExLsjt87LPpuNvvmg3dnVuoQ2vtviND5oM0NPyjUEWP/J/kbHxC5diD8xLuJJ9pqgkZFJt1Kg6ix6jVCYxWFObK9lhhSgcmleuXiVTqll2VcBzVrL3cIu/FFq1v6AfG71NG+j15IsoHPOjRc9bW5qGbmTEdU2oA1oGjWiwARQQxt88fbrx8kBwL31wN/vX2vw05VZpXq8ovUEJhXJUg+E7rwtLSQdlVaaK5GjZwDuLHmEdrgW+IQXNIPgrMGLZXIeJRGAhriKihodRwQMRKKXvqhMtxNDxQHQg7hWoscm5KcyJlYTubIaYq9jRqgBU/wAjlX7HhMiPuvHXKYnNSd2mKpPZFLXBwNCNCiEciMzO0Uc3zt5bOHL9kKKmlI5Y4OF9iOIOoKux9aHY9WqPZeo3HVKIhJW52CAQWmrXCrTy58xoVUVXNo0rNdYsJwUrColJDUBS7ZXoOi63L+JgJtVoceVgSuXYFJmNFZD2Jv8ApFz9PVdRmnVpCZoPMfl6fFbGAsAu4XnPioY4hh33Q+I4E1GiPYRgD4sPPUgEmnMDf4qLDsK7+IyG216O5Aa/fNGsZ7QCDE7qEQ1jQABb1Tr3vvJHqd/T8rNhZHkMk1ht1pvf4H3CB9icWiNY97xDyXzAh1/XN1Weme1L2uORkLKCaVDzb/2TMfxIQobIEM6Xf1WXmowcbHqsjt3WXXv/AAveY74dg4mtgjaMzd99zuN+/Ujy5tUccmc0Vz6AZzmIbYAnWlfb6oO9yuTBqSqzoYSkjiTaWYwNFBQpNFU/u16GoaIpYsTwhg0BqeZ+6qDIpstkyi4klSWZNudU3IvMikC9Uqqj7tehqenUUgKqiLE3Ip6JtF1LrUORLIpsqWVdS61DkXuRSZUsqil1qHIvcieQlRQrKSE/w5TpqOR4hQOspXNom0UkqSzKUwlOa5LKvWtULkc7M4iYL3PaGFxbkGdpdS4JpQi9gtDL9p4oFMkL1D/96xUF1CiLH1umY8Q9rcoOiVfg4Xuzlvzd+vvwuq9je0jjDjNDYbYrhXMc+g2HjssjOYtGa9wcGVrwd/uQyQxIw3Nc00obrWzck2YIisNnAbb7ojJ5ASQ46/wtuH4NgsbC1jWgPZzR2Ov1O5774IWKnIpc5zjqSooLrEU9UkkApaEl09nc39bQgppCSSGUqEwheUSSVVZOYpJyCGkU3FUklyba0HDOJ4IpQUTgEklZJFOaFI8USSRBsqcFNXpakkrKAvEiEklCheFeJJKqkJpC9hCpSSQymYADIAV45eJJKCqE2bKSQSSXBcpAicpYVSSVgmMKLkTmoxIT72soDapSSRGq+Fe5j7aa09l//9k=" alt="profile-picture" />
            </div>
            <div className='msg-ctnr'>
            <p><strong>{eachMessage.username}</strong></p>  
            <p><small>{eachMessage.text}</small></p>
            <p className='txt-tym'>
           {getTime(eachMessage.createdAt)}
               </p>
            </div>
            </li>)
        }
        {
           currentMessagesStore&&currentMessagesStore.map((eachMessage:any,index:number)=><li key={`${eachMessage.createdAt} ${index}`}>
            <p><strong>{eachMessage.username}</strong></p>
            <p><small>{eachMessage.text}</small></p>
           <small>
           <p className='txt-tym'>{eachMessage.createdAt}</p>
               </small> 
            </li>)
        }
       </ul>
       </div>
     }
      <div className="input-ctnr">
       <input placeholder='enter your message here to send...' className='txt-box' type="text-box" value={typedText} onChange={(e)=>{
           setTypedText(e.target.value);
        }} />
        <button className='snd-btn' onClick={()=>{
            handleSendMessage(currentroom,socket,typedText);
            setTypedText("");
        }}>send</button>
       </div>
    </div>
  );
}
export default ChatMessages;

