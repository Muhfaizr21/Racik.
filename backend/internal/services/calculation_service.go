package services

import "math"

type CalculationService struct{}

func NewCalculationService() *CalculationService {
	return &CalculationService{}
}

// ConvertVolumeToWeight menghitung berat gram dari volume ml dan massa jenis (specific gravity)
func (s *CalculationService) ConvertVolumeToWeight(volumeMl float64, specificGravity float64) float64 {
	return math.Round((volumeMl*specificGravity)*100) / 100
}

// ConvertWeightToVolume menghitung volume ml dari berat gram dan massa jenis (specific gravity)
func (s *CalculationService) ConvertWeightToVolume(weightGrams float64, specificGravity float64) float64 {
	if specificGravity <= 0 {
		return 0
	}
	return math.Round((weightGrams/specificGravity)*100) / 100
}

// EstimateMacerationDays menghitung estimasi hari curing optimal berdasarkan konsentrasi minyak
func (s *CalculationService) EstimateMacerationDays(concentrationPct float64) int {
	days := 18.0 + (concentrationPct * 0.6)
	return int(math.Round(days))
}

// CalculateEvaporationLoss menghitung persentase susut penguapan alkohol alami (Angels' Share)
func (s *CalculationService) CalculateEvaporationLoss(daysElapsed int, avgTempC float64) float64 {
	// Koefisien dasar penguapan per hari pada suhu standar 16-18 derajat C
	baseDailyLoss := 0.0008
	if avgTempC > 20.0 {
		baseDailyLoss += (avgTempC - 20.0) * 0.0002
	}
	lossPct := float64(daysElapsed) * baseDailyLoss * 100.0
	return math.Round(lossPct*100) / 100
}

// CalculateCostPerSpray menghitung biaya HPP per semprotan berdasarkan atomizer standar (0.07 ml)
func (s *CalculationService) CalculateCostPerSpray(costPerBottle float64, bottleSizeMl int) float64 {
	if bottleSizeMl <= 0 {
		return 0
	}
	spraysCount := float64(bottleSizeMl) / 0.07 // rata-rata 14 semprotan per 1 ml
	return math.Round((costPerBottle/spraysCount)*100) / 100
}
