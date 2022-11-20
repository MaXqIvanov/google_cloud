import React, { useState, useRef } from 'react'
import styles from '../scss/HomePage.module.scss'
import html2canvas from 'html2canvas'
import { getScreen } from '../store/screenSlice';
import { useAppDispatch } from '../hooks/redux';
import { useSelector } from 'react-redux';
import { RootState } from '../store';


export const HomePage = () => {
  const dispatch = useAppDispatch()
  const {loading} = useSelector((state: RootState)=> state.screen)
  const [image, setImage] = useState<any>(null);
  const [image_preview, setImagePriview] = useState<any>(null);
  const ref = useRef(null)
  const loadPhoto = ({ target }: any) => {    
    const preview: any = document.querySelector('img');
    let file:any = document?.querySelector('input[type=file]');
    file = file.files[0];
    const reader = new FileReader();
    reader.onloadend = function () {
      preview.src = reader.result;
    };
    if (file) {
      reader.readAsDataURL(file);
    } else {
      preview.src = '';
    }
    setImage(target.files[0]);
    setImagePriview(preview);
  };
  const returnHome = ()=>{
    setImagePriview(null)
    setImage(null)
  }
  const getImage = ()=>{
    let content: any = document.getElementById("content")
		html2canvas(content).then(function(canvas:HTMLCanvasElement) {
      let image_send = canvas.toDataURL('image/jpeg', [0.0, 1.0])
        if(image_send){
          let data = new FormData()
          data.append('image_send', image_send)
          dispatch(getScreen({image_send}))
      }
		});	
  }
  
  const [value_text_area, setValueTextArea] = useState<string>('')
  const [is_visible_text_area, setIsVisibleTextArea] = useState<boolean>(true)

  return (
    <div className={styles.screen}>
      <div id={'content'} className={styles.home}>
        <div onClick={getImage} title='Скачать текстовый файл' className={styles.get_file_btn}></div>
        {image_preview && <><div onClick={returnHome} className={styles.return_btn}></div>
        </>}
        <img className={image_preview ? styles.image : styles.not_image} src={image_preview}></img>
        <div onClick={()=> setIsVisibleTextArea(true)}>{value_text_area}</div>
      </div>
      {!image_preview &&
      <div className={styles.load_photo_btn}>
          <label title='Загрузить изображение' htmlFor="load_img" className={styles.image_btn}>
          </label>
          <input onChange={loadPhoto} id="load_img" type="file" name="photo" style={{opacity: '0', maxHeight: '10px', maxWidth: '10px'}}></input>
      </div>}
      <textarea onMouseLeave={()=> setIsVisibleTextArea(false)}
        onChange={(e)=> setValueTextArea(e.target.value)}
        value={value_text_area}
        placeholder="Введите текст для заполнения"
        className={styles.textarea}/>
      {loading && <div className={styles.loading}></div>}
  </div>
  )
}
