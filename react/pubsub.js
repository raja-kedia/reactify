

function rerenderApp() {

    const Obj = {};

    return {
        subscribe: (key, func) => {
            if(!Obj[key]) {
                Obj[key] = func;
            }
        },
        publish: (key, args) => {
            if(Obj[key]) {
                Obj[key](args);
            }
        }
    }
    
}

export const RerenderListener = rerenderApp();
