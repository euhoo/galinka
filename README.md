Very simple library for driving your app's state.  
Данная библиотека вдохновлена Redux и использует некоторые ее идеи.  
Пример использования на React.  

<h1> Использование</h1> 
<h2 id="#contents">Оглавление</h2> 
<a href="#install">Установка</a>  
<a href="#driver">1.Компонент, загружающий данные в хранилище.</a>    
<a href="#driven">2.Компонент, получающий данные из хранилища.</a>  
<a href="#storeConstructor">3.Настройка storeConstructors. аналог reducers в redux.</a>  
<a href="#features">4.Дополнительные возможности.</a>  
  
<h3>1.Установка</h3>
```
npm i galinka --save
``` 
<h3 id="driver">1. В компоненте, который загружает данные в хранилище</h3> 
<s color="blue">(в примере /example/components/InputComponent.jsx)</s>  


    а)импортируй класс  
    ```aidl
    import Galinka from '../../galinka';
    ```
    б)создай новый инстанс класса. Аргументом передай название хранилища.  
    ```aidl
    const inputStore = new Galinka('toDos');
    ``` 
    Данный инстанс будет использоваться для взаимодействия с хранилищем. Если в компоненте используются разные хранилища, то  необходимо создавать разные инстансы класса Galinka.  
    в)для того, чтобы поместить данные в хранилище на инстансе Galinka для данного хранилища(определяем по названию, переданному при инициализации инстанса) вызови метод inputStore.updateStore('add', data); :  
     ```aidl
       inputStore.updateStore('add', data);
     ```
   где первый аргумент функции - название метода обработки данных(см.ниже) для данного хранилища, а второй - данные.  


   В других хранилищах может быть метод с таким же названием и он выполнен не будет. Если нужно выполнить аптейд данных в нескольких кранилищах по метожу с одним наванием, то создай по одному инстансу для каждого хранилища, где необходимо изменить данные. И на каждом инстансе выполни функцию аптейда.  

<a href="contents">к оглавлению</a>  
<h3 id="driven">2.В компоненте, который использует данные из хранилища:</h3>  
    а, б аналогичны. Аргументом при инициализации передай название хранилища, из которого будешь брать данные.
    Если нужно использовать несколько хранилищ, то есть несколько вариантов:  

        1)сделай несколько инстансов класса Galinka, в каждый единственным аргументом передай название соответствующего хранилища:  
         ```aidl
         const toDosStoreInstance = new Galinka('toDos');
         const someNextStoreInstance = new Galinka('someNextStore');
         ```  

         и для каждого инстанса далее вызови метод  
         ```aidl
         const toDosStore = toDosStoreInstance.getStore();
         const someNextStore = someNextStoreInstance.getStore();
         ```  

        возвращаться будет хранилище по названию, заданному аргументом при инициализации  
          
        2)сделай один инстанс класса Galinka, куда передай название любого(можно основного) хранилища.  
          ```
          const toDosStoreInstance = new Galinka('toDos');
          ```  

          или без аргумента:  
          ```
          const toDosStoreInstance = new Galinka();
          ```  

          и для каждого требуемого хранилища выполни:  
          ```
          const toDosStore = toDosStoreInstance.getStore('toDos');
          const someNextStore = toDosStoreInstance.getStore('someNextStore');
          ```  

          то есть передавай аргументом в функцию getStore название требуемого хранилища  
          
          ВНИМАНИЕ!!! Аргумент - название хранилища - обязательно  



        3)сделай один инстанс класса Galinka, куда передай название любого(можно основного) хранилища.  
           ```
           const toDosStoreInstance = new Galinka('toDos');
           ```  

           для получения всех хранилищ выполнить:
           ```
           const allStores = toDosStoreInstance.getAllStores();
           ```
           из константы allStores получить необходимый store
    г) добавь функции,вызывающие перерендеринг страницы в место, где вызов происходит один раз:
        ```
        componentDidMount = () => {
                inputStore.addStateFunc(this.state, 'toDos');
            };
        ```  

        В React я просто передаю setState в каждом компоненте, где использую Galinka.  
        Именно это место связывает хранилище и фреймворк(библиотеку react в данном случае)  

<a href="contents">к оглавлению</a>
<h3 id="storeConstructor">3.Настройка функций обработки Хранилищ - storeConstructors:</h3>  
       Удобно выполнять в отдельной папке в отдельных файлах для каждого store.  
       В примере это папка /examples/storeConstructors, файл toDos.js  
       а)импортируй класс  
           ```
           import Galinka from '../../galinka';
           ```

       б)создай новый инстанс класса. Аргументом передать название хранилища.Здесь аргумент обязателен  
           ```
           const inputStoreInstance = new Galinka('toDos');
           ```  

       в)задай все функции обработчики данного хранилища.  
       У каждой функции обработчика первый аргумент - данные, второй - старое хранилище.  
       Возвращать функция должна новый store:  
        ```sh
        const del = (id, oldState = []) => oldState.filter(item => !(item.id === id));
        const add = (data, oldState = []) => [data, ...oldState];
        ```  

        Обрати внимание, я задаю дефолтное значение старого store в аргументе функции. Galinka ничего не знает о функциях-обработчиках,
        поэтому подобное дефолтное значение позволит избежать ошибок при первом обращении к функции.  

        г)Структура store - не зона ответственности Galinka. Ты задаешь структуру самостоятельно.  
        Хорошая практика - указывать структуру данного хранилища в начале файла:  
       ```sh
       const thisStoreStructure = [
       		{
       			id:'someUniqueId',
       			data:'some string data',
       		},
       		{
       			id:'someAnotherUniqueId',
       			data:'some another string data',
       		},
       	];
       	```  

       	д)Добавь функции-обработчики текущего store. Для каждой функции создай объект вида  
       	   ```
       	   const addObj = {
           		type: 'add',
           		updateFunc: add,
           	};
           	const delObj = {
            		type: 'del',
            		updateFunc: del,
            	};
       	   ```  

       	   где оба свойства - обязательные.  
       	   свойство из поля type ты потом будешь вызывать при обновлении хранилища (updateStore('add', data), см п.1)  
       	   свойство из поля update - это сама функция обработчик (const add = (data, oldState = []) => [data, ...oldState];)  
       	   
       	   далее есть 2 варианта:  

       	   1)Функций несколько: на инстансе класса Galinka вызови функцию addStoreConstructors куда передай массив сформированных выше объектов:  
       	   ```
       	   toDos.addStoreConstructors([addFuncObj, delFuncObj]);
       	   ```  

       	   2)Функция одна.на инстансе класса Galinka вызови функцию addStoreConstructor, куда передай сформированный выше объект:  
       	   ```
       	   toDos.addStoreConstructor(addFuncObj);
       	   ```
       	е)Подключи файлы конструкторов store к проекту, например проимпортировав их в js точке входа проекта или подключив скриптом в html точке входа  
<a href="contents">к оглавлению</a>
<h3 id="features">4.Дополнительные возможности.</h3>  

        а) История. На данный момент эта фича отключена.  
            При каждом обновлении store, старое состояние хранилищ сохраняется.   
            Можно использовать историю состояний. Метод getFullHistory вернет массив всех состояний, последовательно измененных.  
            По дефолту история выключена, так как сохраняются полный объект всех хранилищ и при длительном использовании это может вызывать утечки памяти.  
            Чтобы включить - на любом инстансе класса Galinka вызови метод enableHistory();  
            Если понадобится выключить историю - на любом инстансе класса Galinka вызови метод disableHistory();  
            Хорошей практикой считается указание всех параметров в отдельном файле.  
<a href="contents">к оглавлению</a>
       
       
