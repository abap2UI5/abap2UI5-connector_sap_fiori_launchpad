sap.ui.define(["sap/ui/core/mvc/Controller", "sap/ui/core/BusyIndicator", "sap/ui/core/mvc/View", "sap/m/MessageBox"],                                                                                                                                         
function(Controller, BusyIndicator, XMLView, MessageBox) {                                                                                                                                                                                                     
    "use strict";                                                                                                                                                                                                                                              
    var that;                                                                                                                                                                                                                                                  
    return Controller.extend("zabap2ui5.controller.View1", {                                                                                                                                                                                                   
                                                                                                                                                                                                                                                               
onInit: async function() {                                                                                                                                                                                                                                     
    BusyIndicator.show();                                                                                                                                                                                                                                      
                                                                                                                                                                                                                                                               
    that = this;                                                                                                                                                                                                                                               
                                                                                                                                                                                                                                                               
    try {                                                                                                                                                                                                                                                      
        if (sap.ushell.ui5service !== undefined) {                                                                                                                                                                                                             
            const oService = await this.getOwnerComponent().getService("ShellUIService");                                                                                                                                                                      
            try {                                                                                                                                                                                                                                              
                var sTitle = that.getOwnerComponent().getComponentData().startupParameters.app_title[0];                                                                                                                                                       
                oService.setTitle(sTitle);                                                                                                                                                                                                                     
            } catch (e) {}                                                                                                                                                                                                                                     
            try {                                                                                                                                                                                                                                              
                sap.z2ui5.startupParameters = that.getOwnerComponent().getComponentData().startupParameters;                                                                                                                                                   
            } catch (e) {}                                                                                                                                                                                                                                     
        }                                                                                                                                                                                                                                                      
    } catch (e) { }                                                                                                                                                                                                                                            
}                                                                                                                                                                                                                                                              
                                                                                                                                                                                                                                                               
        async onAfterRendering() {                                                                                                                                                                                                                             
                                                                                                                                                                                                                                                               
            sap.z2ui5 = {};                                                                                                                                                                                                                                    
            try {                                                                                                                                                                                                                                              
                sap.z2ui5.oParent = this.oView.getParent();                                                                                                                                                                                                    
                if (sap.z2ui5.oParent.getMetadata().getName() !== 'sap.m.App') {                                                                                                                                                                               
                    sap.z2ui5.oParent = this.getView().byId(this.getView().getId() + "--app");                                                                                                                                                                 
                }                                                                                                                                                                                                                                              
            } catch (error) {                                                                                                                                                                                                                                  
                sap.z2ui5.oParent = this.getView().byId(this.getView().getId() + "--app");                                                                                                                                                                     
            }                                                                                                                                                                                                                                                  
            try {                                                                                                                                                                                                                                              
                sap.z2ui5.ComponentData = this.getOwnerComponent().getComponentData();                                                                                                                                                                         
            } catch (e) {}                                                                                                                                                                                                                                     
                                                                                                                                                                                                                                                               
            sap.z2ui5.pathname = this.getView().getModel().sServiceUrl + "/";                                                                                                                                                                                  
            const response = await fetch(sap.z2ui5.pathname);                                                                                                                                                                                                  
            if (!response.ok) {                                                                                                                                                                                                                                
                const errorText = await response.text();                                                                                                                                                                                                       
                MessageBox.error(errorText);                                                                                                                                                                                                                   
            }                                                                                                                                                                                                                                                  
            let reponse = await response.text();                                                                                                                                                                                                               
            let code = reponse.split('<abc/>')[1];                                                                                                                                                                                                             
            let xml = `<mvc:View xmlns='http://www.w3.org/1999/xhtml' xmlns:mvc='sap.ui.core.mvc'>${code}</mvc:View>`;                                                                                                                                         
            const oView = await XMLView.create({                                                                                                                                                                                                               
                type: 'XML',                                                                                                                                                                                                                                   
                definition: xml,                                                                                                                                                                                                                               
                controller: new Controller                                                                                                                                                                                                                     
            });                                                                                                                                                                                                                                                
            sap.z2ui5.oParent.removeAllPages();                                                                                                                                                                                                                
            sap.z2ui5.oParent.insertPage(oView);                                                                                                                                                                                                               
            sap.z2ui5.oView = oView;                                                                                                                                                                                                                           
                                                                                                                                                                                                                                                               
        }                                                                                                                                                                                                                                                      
    });                                                                                                                                                                                                                                                        
});                                                                                                                                                                                                                                                            
                                                                                                                                                                                                                                                               