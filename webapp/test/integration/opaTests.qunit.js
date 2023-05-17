sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'createactivate/test/integration/FirstJourney',
		'createactivate/test/integration/pages/OrdersList',
		'createactivate/test/integration/pages/OrdersObjectPage',
		'createactivate/test/integration/pages/OrderItemsObjectPage'
    ],
    function(JourneyRunner, opaJourney, OrdersList, OrdersObjectPage, OrderItemsObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('createactivate') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheOrdersList: OrdersList,
					onTheOrdersObjectPage: OrdersObjectPage,
					onTheOrderItemsObjectPage: OrderItemsObjectPage
                }
            },
            opaJourney.run
        );
    }
);