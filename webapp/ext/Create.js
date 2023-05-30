sap.ui.define(['sap/ui/core/Fragment'], function (Fragment) {
  'use strict';
  return {
    createFail: async function (oEvent) {
      // create dummy data
      const payloads = [];
      for (let i = 1; i <= 50; i++) {
        let payload = {
          OrderNo: i.toString(),
          buyer: 'test@test.de',
          currency_code: 'EUR',
        };

        payloads.push(payload);
      }
      // this entry will fail
      payloads.push({
        OrderNo: '3',
        buyer: 'test@test.de',
        currency_code: 'EURO',
      });
      try {
        const tableObject = this.byId(
          'createactivate::OrdersList--fe::table::Orders::LineItem-innerTable'
        );
        const oView = this._view;
        const binding = tableObject.getBinding('items');
        const model = tableObject.getModel();

          binding.attachCreateCompleted(oEvent => {
            let { context, success } = oEvent.getParameters();
            if (!success) {
              // successfully deleted context
              context.delete();
            }
          },
          this
        );

        let contexts = [];
        for (let index = 0; index < payloads.length; index++) {
          const element = payloads[index];
          const context = binding.create(element, true);
          contexts.push(context);
          context.created().catch((error) => {
            console.log('error while creating context.created().catch(');
          });
        }
        await binding.getModel().submitBatch(model.getUpdateGroupId());
        if (!binding.hasPendingChanges()) {
          console.log('sucess');
        } else {
          console.log('hasPendingChanges() true');
          // batch request is still running, cant reset changes
          contexts.forEach(async (context) => {
            await context.delete(model.getUpdateGroupId());
          });
          // cant use resetChanges because just want to delete contexts create above
          //model.resetChanges(model.getUpdateGroupId());
          // show message model
          // delete all messages after close
        }
        console.log('done');
      } catch (error) {
        console.log('error while creating');
        console.log(error);
      }
    },
  };
});
