import time

class Cronometro:
    def __init__(self, offset_inicial=0.5):
        """
        Inicializa el cronómetro.
        :param offset_inicial: Tiempo inicial para la primera lectura (por defecto, 0.5 segundos).
        """
        self.offset_inicial = offset_inicial
        self.ultimo_reset = time.time() - self.offset_inicial

    def tiempo_transcurrido(self):
        """
        Calcula el tiempo transcurrido desde el último reset.
        :return: Tiempo en segundos.
        """
        return time.time() - self.ultimo_reset

    def debe_activarse(self, intervalo_lectura):
        """
        Verifica si ha pasado el tiempo del intervalo desde el último reset.
        :param intervalo_lectura: Tiempo en segundos entre activaciones.
        :return: True si debe activarse, False en caso contrario.
        """
        return self.tiempo_transcurrido() >= intervalo_lectura

    def resetear(self):
        """
        Resetea el cronómetro al tiempo actual.
        """
        self.ultimo_reset = time.time()
