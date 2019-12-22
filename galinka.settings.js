import Galinka from './build/galinka';

//Файл для базовых настроек Galinka. Ты можешь выполнять их на любом инстансе класса Galinka, но 
// хорошей практикой будет вынесение их в отдельный конфигурационный файл.
//по дефолту история изменений stores отключена.
const settings = new Galinka();
settings.enableHistory();