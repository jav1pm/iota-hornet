// set interval for sending messages (milliseconds)
const long interval = 5000;
unsigned long previousMillis = 0;

void setup() {
  // put your setup code here, to run once:

  //Initialize serial and wait for port to open:
  Serial.begin(9600);
  while (!Serial) {
    ; // wait for serial port to connect. Needed for native USB port only
  }

  // avoids blocking if none monitor serial is found
  delay(1500);

  // initialize digital pin LED_BUILTIN as an output.
  pinMode(LED_BUILTIN, OUTPUT);

}

void loop() {
  // put your main code here, to run repeatedly:

  unsigned long currentMillis = millis();
  int temperatura = random(0, 45);
  int humedad = random(0, 100);

  if (currentMillis - previousMillis >= interval) {
    digitalWrite(LED_BUILTIN, HIGH);   // turn the LED on (HIGH is the voltage level)

    // save the last time a message was sent
    previousMillis = currentMillis;

    // Mostrar los datos obtenidos por el monitor serie
    Serial.print("temperatura: ");
    Serial.print(temperatura);
    Serial.print(", ");
    Serial.print("humedad: ");
    Serial.print(humedad);
    Serial.println();

    delay(20000);
    
    digitalWrite(LED_BUILTIN, LOW);    // turn the LED off by making the voltage LOW
  }
}
