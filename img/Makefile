.PHONY: all

dot_files=$(patsubst %.dot,%.png,$(wildcard *.dot))
fdp_files=$(patsubst %.fdp,%.png,$(wildcard *.fdp))
dot_jinja2_files=$(patsubst %.dot-jinja2,%.dot,$(wildcard *.dot-jinja2))
rc_files=$(patsubst %.rc,%.png,$(wildcard *.rc))

all: $(dot_files) $(dot_jinja2_files) $(rc_files) $(fdp_files)

%.dot: %.dot-jinja2
	jinja2 $< > $@

%.png: %.dot
	dot -Tpng $< -Gdpi=300 -o $@

%.png: %.fdp
	fdp -Tpng $< -Gdpi=300 -o $@

%.png: %.rc
	pygment-custom-lex ~/rose/sphinx/ext/cylc-lang.py CylcLexer $< --formatter png -O $@ --theme 'autumn'

clean:
	find . -name "*.dot-jinja2" | sed 's/\.dot-jinja2/\.dot/' |xargs rm || true
	rm *.png || true
