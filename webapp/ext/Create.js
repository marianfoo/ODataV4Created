sap.ui.define([], function () {
  'use strict';
  return {
    createFail: async function (oEvent) {
      const payloads = [
        {
          OrderNo: '3',
          buyer: 'test@test.de',
          currency_code: 'EUR',
        },
        {
          OrderNo: '3',
          buyer: 'test@test.de',
          currency_code: 'EURO',
        },
      ];
      try {
        const tableObject = this.byId(
          'createactivate::OrdersList--fe::table::Orders::LineItem-innerTable'
        );
        const binding = tableObject.getBinding('items');
        const model = tableObject.getModel();

        let resolveFunction;
        let rejectFunction;
        const promise = new Promise((resolve, reject) => {
            resolveFunction = resolve;
            rejectFunction = reject;
        });
        binding.attachCreateCompleted(oEvent => {
            let { context, success } = oEvent.getParameters();
            if (!success) {
              // TODO: This will fail the creation, but not reply with the backend error message
              console.log("failed")
              console.log(context)
              context.delete();
              rejectFunction(context);
            }
            else {
                resolveFunction(context);
            }
          }, this);

        const contexts = [];
        try {
          for (let index = 0; index < payloads.length; index++) {
            const element = payloads[index];
            const context = binding.create(element, true);
            contexts.push(context);
          }
          binding.getModel().submitBatch(model.getUpdateGroupId());
        } catch (error) {
          console.log('error while creating');
        }
        // will crash on error
        await Promise.all(contexts.map(context => context.created()));
        // if(!binding.hasPendingChanges()){
        //     console.log("sucess");
        //     await Promise.all(contexts.map(context => context.created()));
        // } else {
        //     console.log("failed");
        //     // batch request is still running, cant reset changes
        //     model.resetChanges(model.getUpdateGroupId());
        // }
        await promise;
        console.log('done');
      } catch (error) {
        console.log('error while creating');
        console.log(error);
      }
    },
    createSuccess: async function (oEvent) {
      const payloads = [
        {
          OrderNo: '3',
          buyer: 'test@test.de',
          currency_code: 'EUR',
        },
        {
          OrderNo: '3',
          buyer: 'test@test.de',
          currency_code: 'EUR',
        },
      ];
      try {
        const tableObject = this.byId(
          'createactivate::OrdersList--fe::table::Orders::LineItem-innerTable'
        );
        const binding = tableObject.getBinding('items');
        const model = tableObject.getModel();

        let resolveFunction;
        let rejectFunction;
        const promise = new Promise((resolve, reject) => {
            resolveFunction = resolve;
            rejectFunction = reject;
        });
        binding.attachCreateCompleted(oEvent => {
            let { context, success } = oEvent.getParameters();
            if (!success) {
              // TODO: This will fail the creation, but not reply with the backend error message
              console.log("failed")
              console.log(context)
              context.delete();
              rejectFunction(context);
            }
            else {
                resolveFunction(context);
            }
          }, this);

        const contexts = [];
        try {
          for (let index = 0; index < payloads.length; index++) {
            const element = payloads[index];
            const context = binding.create(element, true);
            contexts.push(context);
          }
          binding.getModel().submitBatch(model.getUpdateGroupId());
        } catch (error) {
          console.log('error while creating');
        }
        // will crash on error
        await Promise.all(contexts.map(context => context.created()));
        // if(!binding.hasPendingChanges()){
        //     console.log("sucess");
        //     await Promise.all(contexts.map(context => context.created()));
        // } else {
        //     console.log("failed");
        //     // batch request is still running, cant reset changes
        //     model.resetChanges(model.getUpdateGroupId());
        // }
        await promise;
        console.log('done');
      } catch (error) {
        console.log('error while creating');
        console.log(error);
      }
    },
  };
});
