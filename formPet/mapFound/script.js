function initMap() {
    // Verifica se o navegador suporta geolocalização
    if (navigator.geolocation) {
        // Solicita a localização do usuário com alta precisão
        navigator.geolocation.getCurrentPosition(
            (position) => {
                // Define a localização do usuário como o centro do mapa
                const userLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                // Estilo do mapa para remover pontos de interesse (POIs)
                const estiloMapa = [
                    {
                        featureType: "poi",
                        elementType: "all",
                        stylers: [{ visibility: "off" }] // Remove todos os locais (lojas, parques, hospitais, etc.)
                    }
                ];

                // Cria o mapa com a localização do usuário como centro
                const map = new google.maps.Map(document.getElementById("map"), {
                    center: userLocation,
                    zoom: 15, // Aumenta o zoom para uma visão mais próxima
                    styles: estiloMapa, // Aplica o estilo personalizado
                    streetViewControl: false, // Remove o Pegman (Street View)
                    mapTypeControl: false, // Desativa controle de tipos de mapas
                });

                // Adiciona um marcador na localização do usuário
                addMarker(userLocation, map);
            },
            (error) => {
                // Caso ocorra um erro ao obter a localização, exibe uma mensagem de erro
                handleGeolocationError(error);
                // Define uma localização padrão (ex: São Paulo) como fallback
                const defaultLocation = { lat: -23.550520, lng: -46.633308 }; // São Paulo
                const map = new google.maps.Map(document.getElementById("map"), {
                    center: defaultLocation,
                    zoom: 12,
                    styles: estiloMapa,
                    streetViewControl: false,
                    mapTypeControl: false,
                });
                addMarker(defaultLocation, map); // Adiciona um marcador na localização padrão
            },
            {
                enableHighAccuracy: true, // Solicita alta precisão
                timeout: 5000, // Tempo máximo de espera para obter a localização
                maximumAge: 0 // Não usa cache de localização
            }
        );
    } else {
        // Caso o navegador não suporte geolocalização, exibe uma mensagem de erro
        alert("Seu navegador não suporta geolocalização.");
        // Define uma localização padrão (ex: São Paulo) como fallback
        const defaultLocation = { lat: -23.550520, lng: -46.633308 }; // São Paulo
        const map = new google.maps.Map(document.getElementById("map"), {
            center: defaultLocation,
            zoom: 12,
            styles: estiloMapa,
            streetViewControl: false,
            mapTypeControl: false,
        });
        addMarker(defaultLocation, map); // Adiciona um marcador na localização padrão
    }

    // Função para tratar erros de geolocalização
    function handleGeolocationError(error) {
        switch(error.code) {
            case error.PERMISSION_DENIED:
                alert("Você negou a solicitação de geolocalização. O mapa será exibido com uma localização padrão.");
                break;
            case error.POSITION_UNAVAILABLE:
                alert("As informações de localização não estão disponíveis. O mapa será exibido com uma localização padrão.");
                break;
            case error.TIMEOUT:
                alert("A solicitação de localização expirou. O mapa será exibido com uma localização padrão.");
                break;
            case error.UNKNOWN_ERROR:
                alert("Ocorreu um erro desconhecido ao tentar obter a localização. O mapa será exibido com uma localização padrão.");
                break;
        }
    }

    // Função para adicionar um marcador no mapa
    function addMarker(location, map) {
        new google.maps.Marker({
            position: location,
            map: map,
        });
    }
}
