class MobilMenu{

    getMenu(m){
        $('body').find('.mobil-bottom-menu').remove();
        switch(m){

            case "users":
                return '<div class="mobil-bottom-menu">'+
                    '<div class="ctn">'+

                        '<div class="ctn-col-25">'+
                            '<button class="module-tool-btn users-prime-ctr-btn" data-btn="users"><i class="fas fa-user"></i></button>'+
                        '</div>'+

                        '<div class="ctn-col-25">'+
                            '<button class="module-tool-btn users-prime-ctr-btn" data-btn="roles"><i class="fas fa-user-circle"></i></button>'+
                        '</div>'+

                        '<div class="ctn-col-25">'+
                            '<button class="back-btn" onclick="users.listUsers()" type="button"><i class="fas fa-sync-alt"></i></button>'+
                        '</div>'+

                        '<div class="ctn-col-25">'+
                            '<button class="users-add-btn" data-btn="users" type="button"><i class="fas fa-plus-square"></i></button>'+
                        '</div>'+

                    '</div>'+
                '</div>';
            break;

            case "reports":
                return '<div class="mobil-bottom-menu">'+
                    '<div class="ctn">'+

                        '<div class="ctn-col-thirds">'+
                            '<button class="export-to-excel-btn module-tool-btn" type="button"><i class="fas fa-file-excel"></i></button>'+
                        '</div>'+

                        '<div class="ctn-col-thirds">'+
                            '<button class="reports-tools-print-btn module-tool-btn" type="button"><i class="fas fa-print"></i></button>'+
                        '</div>'+

                        '<div class="ctn-col-thirds">'+
                            '<button class="reports-tools-save-btn module-tool-btn" type="button"><i class="far fa-save"></i></button>'+
                        '</div>'+

                    '</div>'+
                '</div>';
            break;

            case "registros":
                return '<div class="mobil-bottom-menu">'+
                    '<div class="ctn">'+

                        '<div class="ctn-col-thirds">'+
                            
                        '</div>'+

                        '<div class="ctn-col-thirds">'+
                            '<button class="registros-sync-table module-tool-btn" type="button"><i class="fas fa-sync-alt"></i></button>'+
                        '</div>'+

                        '<div class="ctn-col-thirds">'+
                            
                        '</div>'+

                    '</div>'+
                '</div>';
            break;

            case "backups":
                return '<div class="mobil-bottom-menu">'+
                    '<div class="ctn">'+

                        '<div class="ctn-col-5">'+
                            '<button class="backups-sync-table module-tool-btn" type="button"><i class="fas fa-sync-alt"></i></button>'+
                        '</div>'+

                        '<div class="ctn-col-5">'+
                            '<button type="button" class="module-tool-btn backup-now-btn"><i class="fas fa-download"></i></button>'+
                        '</div>'+

                    '</div>'+
                '</div>';
            break;

        }

    }



}