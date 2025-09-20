import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [year, setYear] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [results, setResults] = useState<any>(null);

  const onSubmit = () => {
    const d = parseInt(day, 10);
    const m = parseInt(month, 10);
    const y = parseInt(year, 10);

    if (isNaN(d) || isNaN(m) || isNaN(y)) {
      Alert.alert("Error", "Please enter numbers for day, month, and year!");
      return;
    }

    if (d < 1 || d > 31 || m < 1 || m > 12 || y < 1 || y > 2500) {
      Alert.alert("Error", "Invalid date!");
      return;
    }

    const newDateString = `${m}${d}${y}`;

    const res = {
      prime: isPrime(newDateString),
      palindrome: isPalindrome(newDateString),
      pythagorean: isPythagorean(d, m, y),
      perfectPower: isPerfectPower(newDateString),
      armstrong: isArmstrong(newDateString),
      equation: isEquation(d, m, y),
      hex: toHex(m, d, y),
      hsl: toHSL(m, d, y),
    };

    setResults(res);
    setIsVisible(true);
  };

  const isPrime = (numString: string) => {
    const num = parseInt(numString, 10);
    if (isNaN(num) || num <= 1) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) return false;
    }
    return true;
  };

  const isPalindrome = (numString: string) =>
    numString === numString.split("").reverse().join("");

  const isPythagorean = (day: number, month: number, year: number) =>
    day * day + month * month === year * year;

  const isPerfectPower = (numString: string) => {
    const num = parseInt(numString, 10);
    if (isNaN(num) || num <= 1) return false;
    for (let base = 2; base <= Math.sqrt(num); base++) {
      for (let exp = 2; exp <= 9; exp++) {
        if (Math.pow(base, exp) === num) return true;
      }
    }
    return false;
  };

  const isArmstrong = (numString: string) => {
    const num = parseInt(numString, 10);
    if (isNaN(num)) return false;
    const digits = numString.length;
    const sum = numString
      .split("")
      .reduce((acc, ch) => acc + Math.pow(parseInt(ch, 10), digits), 0);
    return sum === num;
  };

  const isEquation = (day: number, month: number, year: number) => {
    return (
      day + month === year ||
      day - month === year ||
      day * month === year ||
      (month !== 0 && day / month === year) ||
      Math.pow(day, month) === year
    );
  };

  const toHex = (month: number, day: number, year: number) => {
    const yy = year % 100;
    const hex1 = `#${month.toString().padStart(2, "0")}${day
      .toString()
      .padStart(2, "0")}${yy.toString().padStart(2, "0")}`;
    const hex2 = `#${day.toString().padStart(2, "0")}${month
      .toString()
      .padStart(2, "0")}${yy.toString().padStart(2, "0")}`;
    return [hex1, hex2];
  };

  const toHSL = (month: number, day: number, year: number) => {
    const yy = year % 100;
    const hsl1 = `hsl(${month}, ${day}%, ${yy}%)`;
    const hsl2 = `hsl(${day}, ${month}%, ${yy}%)`;
    return [hsl1, hsl2];
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🎉 Date Pattern Checker 🎉</Text>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          onChangeText={setMonth}
          placeholder="MM"
          keyboardType="numeric"
          maxLength={2}
          value={month}
        />
        <TextInput
          style={styles.input}
          onChangeText={setDay}
          placeholder="DD"
          keyboardType="numeric"
          maxLength={2}
          value={day}
        />
        <TextInput
          style={styles.input}
          onChangeText={setYear}
          placeholder="YYYY"
          keyboardType="numeric"
          maxLength={4}
          value={year}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={onSubmit}>
        <Text style={styles.buttonText}>Check Date</Text>
      </TouchableOpacity>

      {isVisible && results && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Results</Text>
          <Text>Prime: {results.prime ? "✅" : "❌"}</Text>
          <Text>Palindrome: {results.palindrome ? "✅" : "❌"}</Text>
          <Text>Pythagorean: {results.pythagorean ? "✅" : "❌"}</Text>
          <Text>Perfect Power: {results.perfectPower ? "✅" : "❌"}</Text>
          <Text>Armstrong: {results.armstrong ? "✅" : "❌"}</Text>
          <Text>Equation: {results.equation ? "✅" : "❌"}</Text>
          <Text>Hex #MMDDYY: {results.hex[0]}</Text>
          <Text>Hex #DDMMYY: {results.hex[1]}</Text>
          <Text>HSL (MM,DD%,YY%): {results.hsl[0]}</Text>
          <Text>HSL (DD,MM%,YY%): {results.hsl[1]}</Text>

          <View
            style={[styles.colorBox, { backgroundColor: results.hex[0] }]}
          />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f9fafb",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 30,
    color: "#2c3e50",
    textAlign: "center",
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  input: {
    height: 50,
    width: 80,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    marginHorizontal: 6,
    padding: 12,
    backgroundColor: "white",
    textAlign: "center",
    fontSize: 18,
  },
  button: {
    backgroundColor: "#3498db",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  card: {
    marginTop: 25,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 16,
    width: "100%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 15,
    color: "#333",
  },
  colorBox: {
    width: 100,
    height: 100,
    borderRadius: 12,
    marginTop: 15,
  },
});
